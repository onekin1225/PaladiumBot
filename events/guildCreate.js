module.exports = class {
    constructor (client) {
      this.client = client;
    }

    async run (guild) {

        // Loads discord lib
        var Discord = require("discord.js");

        var logEmbed = new Discord.RichEmbed().setAuthor(guild.name, guild.iconURL).setColor("#32CD32").setDescription("J'ai rejoint **"+guild.name+"**, avec **"+guild.members.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.filter((m) => m.user.bot).size+" bots)");
        var logs = this.client.channels.get(this.client.config.logs);
        if(logs){
            logs.send(logEmbed);
        }

        this.client.wait(2000);

        await this.client.functions.createStatsChannels(this.client, guild);

        this.client.wait(5000);

        await this.client.functions.updateStats(this.client, guild.id);

    }
};