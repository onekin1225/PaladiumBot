const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Eval extends Command {
    constructor (client) {
        super(client, {
            name: "eval",
            description: "Exécute le code !",
            dirname: __dirname,
            usage: "eval",
            enabled: true,
            guildOnly: false,
            aliases: ["e"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$eval",
            owner: true,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        if(message.content.includes("client.token") || message.content.includes("config.token")){
            return message.channel.send("```Js\nHum... the string may contains the discord bot token```");
        } 
        
        const content = message.content.split(" ").slice(1).join(" ");
        const result = new Promise((resolve, reject) => resolve(eval(content)));
        
        return result.then((output) => {
            if(typeof output !== "string"){
                output = require("util").inspect(output, { depth: 0 });
            }
            if(output.includes(this.client.token)){
                output = output.replace(this.client.token, "T0K3N");
            }
            return message.channel.send(output, { code: "js" });
        }).catch((err) => {
            err = err.toString();
            if (err.includes(this.client.token)){
                err = err.replace(this.client.token, "T0K3N");
            }
            return message.channel.send(err, { code: "js" });
        });

    }

}

module.exports = Eval;