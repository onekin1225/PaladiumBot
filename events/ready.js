const Discord = require('discord.js')

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run () {

        var client = this.client;

        // Logs some informations using the logger file
        client.logger.log(`Loading a total of ${client.commands.size} command(s).`, 'log');
        client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

        /* Post DBL stats
        const DBL = require("dblapi.js");
        const dbl = new DBL(client.config.discordBotsToken, client);
        dbl.postStats(client.guilds.size);*/

        // Update the game every 20s
        var games = [
            {
                name:`@Paladium'Bot help on {servs} servers`,
                type:`LISTENING`
            },
            {
                name:`add me with ${client.config.prefix}invite!`,
                type:`STREAMING`
            }
        ];
        var i = 0;
        setInterval(function(){
            client.user.setActivity(games[i].name.replace("{servs}", client.guilds.size), {type: games[i].type});
            if(games[parseInt(i + 1)]) i++;
            else i = 0;
        }, 20000);

    }
};