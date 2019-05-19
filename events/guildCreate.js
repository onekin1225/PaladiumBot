module.exports = class {
    constructor (client) {
      this.client = client;
    }

    async run (guild) {

        // Loads discord lib
        var Discord = require("discord.js");

        var logEmbed = new Discord.RichEmbed().setAuthor(guild.name, guild.iconURL).setDescription("Merci au staff de "+guild.name+" de m'avoir ajouté !");
        var logs = this.client.channels.get(this.client.config.logs);
        if(logs){
            logs.send(logEmbed);
        }

        this.client.wait(2000);

        try {
            guild.createChannel("PALADIUM BOT", {
                type:"category"
            }).then(cat => {
                cat.overwritePermissions(guild.roles.find(r => r.name === "@everyone"), {
                    "CONNECT":false,
                    "VIEW_CHANNEL":true
                }).then(async (cat) => {
                    await guild.createChannel("【🛡】Statut : Patientez...", {
                        type:"voice",
                        parent:cat
                    });
                    await guild.createChannel("【👥】Joueurs : Patientez...", {
                        type:"voice",
                        parent:cat
                    });
                });
            });
        } catch(e){
            return;
        }

    }
};