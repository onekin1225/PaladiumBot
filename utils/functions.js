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
            if(error){
                return;
            }
            if(!body.players){
                body.players = {
                    now:0
                };
            }
            var status = "【🛡】Statut : "+(body.online ? "En ligne" : "Maintenance");
            var players = "【👥】Joueurs : "+body.players.now;
            client.guilds.forEach((guild) => {
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
        return new Promise(function(resolve, reject){
            try {
                // used to store channel IDs
                var channels = {
                    category:null,
                    status:null,
                    players:null
                };
    
                // Create category
                guild.createChannel("PALADIUM BOT", { type:"category" }).then((cat) => {
                    // Update channels object
                    channels.category = cat.id;
                    // Create permissions for the category
                    cat.overwritePermissions(guild.roles.find((r) => r.name === "@everyone"), {
                        "CONNECT":false,
                        "VIEW_CHANNEL":true
                    }).then(async () => {
                        // Create status channel
                        await guild.createChannel("【🛡】Statut : Patientez...", {
                            type:"voice",
                            parent:channels.category
                        }).then((ch) => {
                            channels.status = ch.id;
                        });
                        // Create players channel
                        await guild.createChannel("【👥】Joueurs : Patientez...", {
                            type:"voice",
                            parent:channels.category
                        }).then((ch) => {
                            channels.players = ch.id;
                        });
                        // Save in the db
                        client.databases[0].set(guild.id, channels);
                        resolve(client.databases[0].get(guild.id));
                    });
                });
            } catch(e){
                // if there is an error, catch them
                reject("error");
            }
        });
    },

    /**
     * Check if a guild is correctly installed
     *
     * @param {object} client The discord client
     * @param {string} guildId The guild ID
     *
     * @returns Boolean, if the guild is correctly installed
     */
    checkGuild(client, guildId){
        var gData = client.databases[0].get(guildId);
        if(!gData){
            return false;
        } else {
            var guild = client.guilds.get(guildId);
            var category = guild.channels.get(gData.category);
            var status = guild.channels.get(gData.status);
            var players = guild.channels.get(gData.players);
            if(!status && !players){
                return false;
            } else {
                return true;
            }
        }
    },

     /**
     * Clear a guild
     *
     * @param {object} client The discord client
     * @param {string} guildId The guild ID
     *
     */
    clearGuild(client, guildId){
        var gData = client.databases[0].get(guildId);
        var guild = client.guilds.get(guildId);
        if(gData){
            var category = guild.channels.get(gData.category);
            var status = guild.channels.get(gData.status);
            var players = guild.channels.get(gData.players);
            if(category){
                category.delete();
            }
            if(status){
                status.delete();
            }
            if(players){
                players.delete();
            }
            return true;
        } else {
            var tcategory = guild.channels.filter((ch) => ch.type === "category").find((ch) => ch.name === "PALADIUM BOT");
            var tstatus = guild.channels.filter((ch) => ch.type === "voice").find((ch) => ch.name.startsWith("【🛡】Statut :"));
            var tplayers = guild.channels.filter((ch) => ch.type === "voice").find((ch) => ch.name.startsWith("【👥】Joueurs :"));
            if(tcategory){
                tcategory.delete();
            }
            if(tstatus){
                tstatus.delete();
            }
            if(tplayers){
                tplayers.delete();
            }
            return true;
        }
    }

};