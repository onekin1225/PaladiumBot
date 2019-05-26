module.exports = class {
    constructor (client) {
      this.client = client;
    }

    async run (guild) {

        this.client.wait(2000);
        await this.client.functions.createStatsChannels(this.client, guild);
        this.client.wait(5000);
        await this.client.functions.updateStats(this.client, guild.id);

    }
};