const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Invite extends Command {
    constructor (client) {
        super(client, {
            name: "invite",
            description: "Inviter le bot sur votre serveur !",
            dirname: __dirname,
            usage: "invite",
            enabled: true,
            guildOnly: false,
            aliases: ["add","invit"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$invite",
            owner: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        var linksEmbed = new Discord.RichEmbed()
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
            .addField("Notre Discord",
                "[Accéder au Discord des développeurs du bot](https://discord.gg/NPReeRB)"
            )
            .addField("Ajouter le bot",
                "[Inviter le bot sur votre propre serveur](https://discordapp.com/oauth2/authorize?client_id=557649686417113149&permissions=2146958847&scope=bot)"
            )
            .setFooter("Une idée pour améliorer le bot ? Rejoignez notre Discord !")
            .setThumbnail("https://cdn.discordapp.com/emojis/579661928767422464.png")
            .setColor(data.color);

        // Send the embed in the current channel
        message.channel.send(linksEmbed);
    }

}

module.exports = Invite;