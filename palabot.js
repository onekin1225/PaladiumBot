// Load up the discord.js library
const { Client, Collection, RichEmbed } = require("discord.js");
// We also load the rest of the things we need in this file:
const { promisify } = require("util"),
fs = require("fs"),
path = require("path"),
readdir = promisify(fs.readdir),
Quickdb = require("quick.db");
Quickdb.init("./data/palabot.sqlite");

const config = require("./data/config.js"),
logger = require("./utils/logger.js"),
functions = require("./utils/functions.js");

// Creates new class
class PalaBot extends Client {

    constructor (options) {
        super(options);
        this.config = config; // Load the config file
        this.commands = new Collection(); // Creates new commands collection
        this.aliases = new Collection(); // Creates new command aliases collection
        this.wait = require("util").promisify(setTimeout); // client.wait(1000) - Wait 1 second
        this.functions = require("./utils/functions.js"); // Load the functions file
        this.logger = logger;
        this.databases = [ // Create tables (quick.db)
            new Quickdb.Table("serversdata"),
            new Quickdb.Table("cooldowns"),
            new Quickdb.Table("guildsettings")
        ],
        this.emotes = config.emotes;
    }

    // This function is used to load a command and add it to the collection
    loadCommand (commandPath, commandName) {
        try {
            const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
            props.conf.location = commandPath;
            if (props.init){
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }

    // This function is used to unload a command (you need to load them again)
    async unloadCommand (commandPath, commandName) {
        let command;
        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if (this.aliases.has(commandName)){
            command = this.commands.get(this.aliases.get(commandName));
        }
        if (!command){
            return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
        }
        if (command.shutdown){
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }

}

// Creates new client
const client = new PalaBot({
    disableEveryone: true // Disable everyone mentions
});

const init = async () => {

    // Search for all commands
    let directories = await readdir("./commands/");
    client.logger.log(`Loading a total of ${directories.length} categories.`, "log");
    directories.forEach(async (dir) => {
        let commands = await readdir("./commands/"+dir+"/");
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
            const response = client.loadCommand("./commands/"+dir, cmd);
            if(response){
                client.logger.log(response, "error");
            }
        });
    });

    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");
    evtFiles.forEach((file) => {
        const eventName = file.split(".")[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    client.login(client.config.token); // Log in to the discord api

};

init();

// if there are errors, log them
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", (e) => client.logger.log(e, "error"))
    .on("warn", (info) => client.logger.log(info, "log"))
    .on("guildCreate", (guild) => {
        var newGuild = new RichEmbed().setAuthor(guild.name, guild.iconURL).setColor("#32CD32").setDescription("J'ai rejoint **"+guild.name+"**, avec **"+guild.members.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.filter((m) => m.user.bot).size+" bots)");
        client.channels.get(client.config.logs).send(newGuild);
    })
    .on("guildDelete", (guild) => {
        var oldGuild = new RichEmbed().setAuthor(guild.name, guild.iconURL).setColor("#B22222").setDescription("Quelqu'un m'a expulsé de **"+guild.name+"** avec **"+guild.members.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.filter((m) => m.user.bot).size+" bots)");
        client.channels.get(client.config.logs).send(oldGuild);
    });

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
    client.logger.log("Uncaught Promise Error: "+err, "error");
});