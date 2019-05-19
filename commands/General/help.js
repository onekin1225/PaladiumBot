const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Help extends Command {
    constructor (client) {
        super(client, {
            name: "help",
            description: "Affiche la liste des commandes !",
            dirname: __dirname,
            usage: "help (command)",
            enabled: true,
            guildOnly: false,
            aliases: ["aide"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$help",
            owner: false
        });
    }

    async run (message, args) {

        var helpEmbed = new Discord.RichEmbed()
            .setAuthor("Liste des commandes")

            .setColor(this.client.config.color);

        // Send the embed in the current channel
        message.channel.send(helpEmbed);
    }

}

module.exports = Help;