const Command = require("../../base/Command.js"),
Discord = require("discord.js");

var uData = {};
var conseils = require("../../data/conseils.js");

class Conseils extends Command {
    constructor (client) {
        super(client, {
            name: "conseil",
            description: "Vous donne quelques conseils sur Paladium !",
            dirname: __dirname,
            usage: "conseil",
            enabled: true,
            aliases: ["conseils"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$conseil",
            owner: false,
            cooldown: 500
        });
    }

    async run (message, args, data) {

        var tConseils = [];
        var tUData = uData[message.author.id];
        if(tUData){
            tConseils = conseils.filter((c) => !tUData.includes(c));
            if(tConseils.length < 1){
                tConseils = conseils;
            }
        } else {
            tConseils = conseils;
        }
        
        var nb = Math.floor(Math.random()*tConseils.length);
        var conseil = tConseils[nb];
        if(uData[message.author.id]){
            uData[message.author.id].push(conseil);
        } else {
            uData[message.author.id] = [conseil];
        }

        var embed = new Discord.RichEmbed()
            .setAuthor("Palastuce")
            .setDescription(conseil)
            .setColor(data.color)
            .setFooter("Une astuce secrète que vous connaissez ? Rejoignez notre Discord !");
        message.channel.send(embed);

    }

}

module.exports = Conseils;