var request = require("request");

module.exports = {

    /**
     * Update channels stats
     *
     * @param {object} client The Discord Client
     * @param {string} guildID Optional : the guildID to update
     */
    async updateStats(client, guildID){
        request("https://mcapi.us/server/status?ip="+client.config.palaIP, { json: true }, async function (error, response, body) {
            if(error) return;
            var status = "【🛡】Statut : "+(body.online ? "En ligne" : "Hors ligne");
            var players = "【👥】Joueurs : "+body.players.now;
            client.guilds.forEach(guild => {
                if(guildID && guild.id !== guildID){
                    return;
                } else {
                    var gData = client.databases[0].get(guild.id);
                    if(gData){
                        var tstatus = guild.channels.get(gData.status);
                        if(tstatus){
                            tstatus.setName(status);
                        }
                        var tplayers = guild.channels.get(gData.players);
                        if(tplayers){
                            tplayers.setName(players);
                        }
                    }
                }
            });
        });
    },

    /**
     * Create default channels stats
     *
     * @param {object} client The Discord client
     * @param {object} guild The guild for which the channels will be created
     *
     * @returns The configuration of the guild
     */
    async createStatsChannels(client, guild){
        try {

            // used to store channel IDs
            var channels = {
                category:null,
                status:null,
                players:null
            };

            // Create category
            await guild.createChannel("PALADIUM BOT", { type:"category" }).then(ch => {
                channels.category = ch.id;
                ch.overwritePermissions(guild.roles.find(r => r.name === "@everyone"), {
                    "CONNECT":false,
                    "VIEW_CHANNEL":true
                });
            });

            // Create status channel
            await guild.createChannel("【🛡】Statut : Patientez...", {
                type:"voice",
                parent:channels.category
            }).then(ch => {
                channels.status = ch.id;
            });

            // Create players channel
            await guild.createChannel("【👥】Joueurs : Patientez...", {
                type:"voice",
                parent:channels.category
            }).then(ch => {
                channels.players = ch.id;
            });

            // Save in the db
            client.databases[0].set(guild.id, channels);
            return client.databases[0].get(guild.id);
        } catch(e){
            // if there is an error, catch them
            return console.log(e);
        }
    }

};