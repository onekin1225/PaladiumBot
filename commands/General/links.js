const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Links extends Command {
    constructor (client) {
        super(client, {
            name: "links",
            description: "Affiche les principaux liens de Paladium !",
            dirname: __dirname,
            usage: "links",
            enabled: true,
            guildOnly: false,
            aliases: ["liens"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$links",
            owner: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        var linksEmbed = new Discord.RichEmbed()
            .addField("<:palaOre2:579745156433969162> Principaux liens",
                "Retrouvez les principaux liens utiles de Paladium !"
            )
            .addField("Site",
                "[Accueil](https://paladium-pvp.fr)\n"+
                "[Boutique](http://store.paladium-pvp.fr/)\n"+
                "[Forum](https://paladium-pvp.fr/forum/)",
                true
            )
            .addField("Launchers",
                "[Launcher Windows](http://download.paladium-pvp.fr/launcher/download/Paladium.exe)\n"+
                "[Launcher MacOS/Linux](http://download.paladium-pvp.fr/launcher/download/Paladium.jar)",
                true
            )
            .addField("FuzeIII - YouTube",
                "[V6](https://www.youtube.com/playlist?list=PL1Ew0u3i4u99AhTWHkVizH4j9JOQB-QDS) | "+
                "[V5](https://www.youtube.com/playlist?list=PL1Ew0u3i4u9_GWhYcC6Av5wNMii9bJOxe) | "+
                "[V4](https://www.youtube.com/playlist?list=PL1Ew0u3i4u99kkKqxtVCigrUXTFZnjn6c) | "+
                "[V3](https://www.youtube.com/playlist?list=PL1Ew0u3i4u989co8f5Kv55XQoRBj3zpuj) | "+
                "[V2](https://www.youtube.com/playlist?list=PL1Ew0u3i4u9_O12tDdb25ojXYwxNv97NT) | "+
                "[V1](https://www.youtube.com/playlist?list=PL1Ew0u3i4u98BEKjyYhscUpiZ29roA__e)\n"+
                "[Discord de FuzeIII](https://discord.gg/fuzeiii)\n",
                true
            )
            .addField("Support de Paladium",
                "[Discord](https://discord.gg/Paladium)\n"+
                "[TeamSpeak](https://twitter.com/paladiumpvp/status/628665369591447552)",
                true
            )
            .addField("Paladium'Bot",
                "[Invitation](https://discordapp.com/oauth2/authorize?client_id=557649686417113149&permissions=2146958847&scope=bot) | "+
                "[Voter](https://discordbots.org/bot/579653463290675221/vote) | "+
                "[Support](https://discord.gg/NPReeRB)",
                true
            )
            .setFooter("Une idée pour améliorer le bot ? Rejoignez notre Discord !")
            .setThumbnail("https://cdn.discordapp.com/emojis/579661928767422464.png")
            .setColor(data.color);

        // Send the embed in the current channel
        message.channel.send(linksEmbed);
    }

}

module.exports = Links;