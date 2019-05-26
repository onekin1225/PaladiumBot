module.exports = class {
    constructor (client) {
      this.client = client;
    }

    async run (guild) {

        // Loads discord lib
        var Discord = require("discord.js");

        var logEmbed = new Discord.RichEmbed().setAuthor(guild.name, guild.iconURL).setColor("#B22222").setDescription("Quelqu'un m'a expulsé de **"+guild.name+"** avec **"+guild.members.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.filter((m) => m.user.bot).size+" bots)");
        var logs = this.client.channels.get(this.client.config.logs);
        if(logs){
            logs.send(logEmbed);
        }

    }
};