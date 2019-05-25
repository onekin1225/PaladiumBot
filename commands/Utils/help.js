const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Help extends Command {
    constructor (client) {
        super(client, {
            name: "help",
            description: "Affiche la liste des commandes !",
            dirname: __dirname,
            usage: "help",
            enabled: true,
            aliases: ["aide"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$help",
            owner: false,
            cooldown: 2000
        });
    }

    async run (message, args, data) {

        var prefix = this.client.config.prefix;

        var helpEmbed = new Discord.RichEmbed()
            .setAuthor("Liste des commandes")
            .addField("Utils",
                "`"+prefix+"liens` : Affiche les principaux liens de Paladium !\n"+
                "`"+prefix+"invite` : Inviter le bot sur votre serveur !\n"+
                "`"+prefix+"conseil` : Vous donne quelques conseils pour Paladium !"
            )
            .addField("Stats",
                "`"+prefix+"setup` : Remet en place les salons de stats !\n"+
                "`"+prefix+"update` : Force les salons de stats à se mettre à jour ! (sinon mise à jour auto toutes les 5 minutes)\n"+
                "`"+prefix+"status` : Affiche le statut de Paladium !"
            )
            .addField("Bienvenue",
                "`"+prefix+"welcome #salon` : Active les images de bienvenue dans le salon mentionné !\n"+
                "`"+prefix+"welcome off` : Désactive les images de bienvenue !"
            )
            .addField("Informations",
                "[Invitation](https://discordapp.com/oauth2/authorize?client_id=557649686417113149&permissions=2146958847&scope=bot) | "+
                "[Notre Discord](https://discord.gg/NPReeRB) | "+
                "[Voter](https://discordbots.org/bot/"+this.client.user.id+")"
            )
            .setFooter("Une idée pour améliorer le bot ? Rejoignez notre Discord !")
            .setThumbnail("https://cdn.discordapp.com/emojis/579661928767422464.png")
            .setColor(data.color);

        // Send the embed in the current channel
        message.channel.send(helpEmbed);
    }

}

module.exports = Help;