const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Tricks extends Command {
    constructor (client) {
        super(client, {
            name: "conseil",
            description: "Vous donne quelques conseils sur Paladium !",
            dirname: __dirname,
            usage: "conseil",
            enabled: true,
            guildOnly: false,
            aliases: ["conseils"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$conseil",
            owner: false,
            cooldown: 2000
        });
    }

    async run (message, args, data) {

        var tricks = require("../../data/tricks.js");
        var nb = Math.floor(Math.random()*tricks.length);
        var trick = tricks[nb];

        var embed = new Discord.RichEmbed()
            .setAuthor("Palastuce #"+parseInt(nb+1, 10))
            .setDescription(trick)
            .setColor(data.color)
            .setFooter("Une astuce secrète que vous connaissez ? Rejoignez notre Discord !");
        message.channel.send(embed);

    }

}

module.exports = Tricks;