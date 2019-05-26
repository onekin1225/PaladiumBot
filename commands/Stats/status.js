const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
request = require("request");

class Status extends Command {
    constructor (client) {
        super(client, {
            name: "status",
            description: "Affiche le statut de Paladium !",
            dirname: __dirname,
            usage: "status",
            enabled: true,
            guildOnly: false,
            aliases: ["statut"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$statut",
            owner: false,
            cooldown: 8000
        });
    }

    async run (message, args, data) {

        var e = this.client.emotes;

        message.channel.send(this.client.emotes.loading+" | Collecte des données des serveurs de Paladium...").then(async (m) => {
            var embed = new Discord.RichEmbed()
                .setAuthor("Paladium", "https://cdn.discordapp.com/emojis/579661928767422464.png")
                .setColor(data.color)
                .setFooter("Une idée pour améliorer le bot ? Rejoignez notre Discord !");

            request("https://mcapi.us/server/status?ip="+this.client.config.palaIP, { json: true }, async function (error, response, body) {
                if(error){
                    return m.edit(this.client.emotes.error+" | Une erreur est survenue...");
                }
                if(!body.players){
                    body.players = {
                        now:0
                    };
                }
                embed.setDescription((body.online ? "Les serveurs de Paladium sont en ligne !" : "Les serveurs de Paladium sont en maintenance..."));
                if(body.online){
                    embed.addField(e.on+" Statut",
                        "Serveurs en ligne !"
                    );
                } else {
                    embed.addField(e.off+" Status",
                        "Serveurs en maintenance !"
                    );
                }
                embed.addField(e.player+" Joueurs",
                    body.players.now+" joueur(s) connecté(s)"
                );
                m.edit(":bar_chart: | Statistiques de Paladium :", embed);
            });
        });
    }
}

module.exports = Status;