const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Astuce extends Command {
    constructor (client) {
        super(client, {
            name: "astuce",
            description: "Vous donne quelques conseils sur Paladium !",
            dirname: __dirname,
            usage: "astuce",
            enabled: true,
            guildOnly: false,
            aliases: ["astuces"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$astuce",
            owner: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        var tricks = require("../../data/tricks.js");
        var trick = tricks[Math.floor(Math.random()*tricks.length)];

        var embed = new Discord.RichEmbed()
            .setAuthor("Palastuce")
            .setDescription(trick)
            .setColor(data.color)
            .setFooter("Une astuce secrète que vous connaissez ? Rejoignez notre Discord !");
        message.channel.send(embed);

    }

}

module.exports = Astuce;