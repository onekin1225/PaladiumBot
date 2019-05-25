const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Setup extends Command {
    constructor (client) {
        super(client, {
            name: "setup",
            description: "Remet en place les salons de stats !",
            dirname: __dirname,
            usage: "setup",
            enabled: true,
            guildOnly: false,
            aliases: ["conf"],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
            nsfw: false,
            examples: "$setup",
            owner: false,
            cooldown: 15000
        });
    }

    async run (message, args, data) {
        message.channel.send(this.client.emotes.loading+" | Création des salons en cours...").then(async (m) => {
            await this.client.functions.clearGuild(this.client, message.guild.id);
            await this.client.functions.createStatsChannels(this.client, message.guild);
            await this.client.functions.updateStats(this.client, message.guild.id);
            m.edit(this.client.emotes.success+" | Les salons ont été créés et sont opérationnels !");
        });
    }

}

module.exports = Setup;