const Command = require("../../base/Command.js"),
Discord = require("discord.js");


class Welcome extends Command {
    constructor (client) {
        super(client, {
            name: "welcome",
            description: "Active l'image de bienvenue !",
            dirname: __dirname,
            usage: "welcome",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
            nsfw: false,
            examples: "$welcome",
            owner: false,
            cooldown: 0
        });
    }

    async run (message, args, data) {

        var isEnabled = false;

        var gData = this.client.databases[2].get(message.guild.id);
        if(gData){
            if(gData.welcome){
                isEnabled = true;
            }
        }

        var channel = message.mentions.channels.first();
        if(channel){
            if(channel.guild.id !== message.guild.id){
                return message.channel.send(this.client.emotes.error+" | Une erreur s'est produite !");
            }
        }

        var status = args[0];

        if(!channel && (args[0] !== "off")){
            if(isEnabled){
                return message.channel.send(this.client.emotes.error+" | Les images de bienvenue sont actuellement activées ! Pour les désactiver, tapez `"+this.client.config.prefix+"welcome off` ! Si vous souhaitez seulement modifier le salon des images de bienvenue, tapez `"+this.client.config.prefix+"welcome #nouveau-salon` !");
            } else {
                return message.channel.send(this.client.emotes.error+" | Les images de bienvenue sont actuellement désactivées ! Pour les activer, tapez `"+this.client.config.prefix+"welcome #salon` !");
            }
        }

        if(status === "off"){
            if(!isEnabled){
                return message.channel.send(this.client.emotes.error+" | Les images de bienvenue sont actuellement désactivées ! Pour les activer, tapez `"+this.client.config.prefix+"welcome #salon` !");
            } else {
                this.client.databases[2].delete(message.guild.id+".welcome");
                return message.channel.send(this.client.emotes.success+" | Les images de bienvenue sont maintenant désactivées !");
            }
        } else if(channel){
            this.client.databases[2].set(message.guild.id+".welcome", channel.id);
            return message.channel.send(this.client.emotes.success+" | Les images de bienvenue sont activées dans "+channel+" !");
        }

    }

}

module.exports = Welcome;