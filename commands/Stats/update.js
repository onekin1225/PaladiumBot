const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Update extends Command {
    constructor (client) {
        super(client, {
            name: "update",
            description: "Force les salons de stats à se mettre à jour ! (sinon mise à jour auto toutes les 5 minutes)",
            dirname: __dirname,
            usage: "update",
            enabled: true,
            guildOnly: false,
            aliases: ["maj"],
            permission: "MANAGE_MESSAGES",
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
            nsfw: false,
            examples: "$update",
            owner: false,
            cooldown: 15000
        });
    }

    async run (message, args, data) {
        message.channel.send(this.client.emotes.loading+" | Je suis en train de mettre à jour vos salons...").then(async m => {
            var isOk = this.client.functions.checkGuild(this.client, message.guild.id);
            if(!isOk) return m.edit(this.client.emotes.error+" | Aucun salon à mettre à jour ! Pour créer les salons, utilisez `"+this.client.config.prefix+"setup` !");
            await this.client.functions.updateStats(this.client, message.guild.id);
            m.edit(this.client.emotes.success+" | J'ai mis à jour les salons !");
        });
    }

}

module.exports = Update;