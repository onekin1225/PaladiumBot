// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

var Discord = require("discord.js");

module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (message) {

        // If the messagr author is a bot
        if (message.author.bot || !message.guild){
            return;
        }

        // If the member on a guild is invisible or not cached, fetch them.
        if (!message.member){
            await message.guild.fetchMember(message.author.id);
        }

        // Checks if the bot was mentioned, with no message after it, returns the prefix.
        const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
        if(message.content.match(prefixMention)){
            return message.channel.send("Bonjour, "+message.author+" ! Obtiens la liste des commandes grâce à `"+this.client.config.prefix+"help` !");
        }

        // If the message content is "/pay @Androz 10", the args will be : [ "pay", "@Androz", "10" ]
        const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g);
        // The command will be : "pay" and the args : [ "@Androz", "10" ]
        const command = args.shift().toLowerCase();

        // Gets the command
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

        // If no command found, return;
        if (!cmd){
            return;
        }

        // Check bot permissions :
        var neededPermission = [];
        cmd.conf.botpermissions.forEach(perm => {
            if(!message.channel.permissionsFor(message.guild.me).has(perm)){
                neededPermission.push(perm);
            }
        });
        if(neededPermission.length > 0){
            return message.channel.send(this.client.emotes.error+" | J'ai besoin des permissions suivantes pour effectuer cette commande : `"+neededPermission.map(p => p).join(", ")+"` !");
        }

        // checks if the command can be launched
        if(cmd.conf.permission){
            if(!message.member.hasPermission(cmd.conf.permission)){
                return message.channel.send(this.client.emotes.erorr+" | Vous ne disposez pas des permissions nécessaires pour effectuer cette commande (`"+cmd.conf.permission+"`) !");
            }
        }
        if(!cmd.conf.enabled){
            return message.channel.send(this.client.emotes.error+" | Cette commande est actuellement désactivée !");
        }
        if(cmd.conf.owner && message.author.id !== this.client.config.owner){
            return message.channel.send(this.client.emotes.error+" | Seul le fondateur du bot peut effectuer cette commande !");
        }

        var hasToWait = false;
        var uData = this.client.databases[0].get(message.author.id+cmd.help.name);
        if(uData && (uData > Date.now())){
            return message.channel.send(this.client.emotes.error+" | Vous devez attendre encore **"+Math.ceil((uData - Date.now())/1000)+"** seconde(s) avant de pouvoir de nouveau effectuer cette commande !");
        } else {
            this.client.databases[0].set(message.author.id+cmd.help.name, Date.now()+cmd.conf.cooldown);
        }

        var logEmbed = new Discord.RichEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL).setDescription(message.author.username+" vient d'effectuer la commande "+cmd.help.name+" !");
        var logs = this.client.channels.get(this.client.config.logs);
        if(logs){
            logs.send(logEmbed);
        }

        // If the command exists, **AND** the user has permission, run it.
        cmd.run(message, args, {
            color: this.client.config.color
        });

    }
};