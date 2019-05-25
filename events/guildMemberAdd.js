var Discord = require("discord.js");
const { resolve } = require("path");
const Canvas = require("canvas");
Canvas.registerFont(resolve("./data/fonts/theboldfont.ttf"), { family: "Bold" });

module.exports = class {
    constructor(client){
        this.client = client;
    }

    async run(member){
        var guildData = this.client.databases[2].get(member.guild.id);
        if(guildData){
            if(guildData.welcome){
                var channel = member.guild.channels.get(guildData.welcome);
                if(channel){
                    const applyText = (canvas, pseudo) => {
                        const ctx = canvas.getContext("2d");
                        while (ctx.measureText(pseudo).width > canvas.width - 300){
                            pseudo = pseudo.substr(0, pseudo.length-1);
                        }
                        return pseudo;
                    };

                    const canvas = Canvas.createCanvas(700, 335);
                    const ctx = canvas.getContext("2d");

                    const background = await Canvas.loadImage("./data/img/palaBackground.png");
                    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                    ctx.strokeStyle = "#FF0000";
                    ctx.strokeRect(0, 0, canvas.width, canvas.height);

                    ctx.font = "60px Bold";
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillText(applyText(canvas, member.displayName), canvas.width / 2.2, canvas.height - 170);
                    ctx.fillText("#"+member.user.discriminator, canvas.width / 2.2, canvas.height - 110);

                    ctx.font = "25px Bold";
                    ctx.fillText("Bienvenue sur "+member.guild.name+" !", canvas.width / 40, canvas.height - 10);

                    ctx.beginPath();
                    ctx.arc(125, 170, 100, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.clip();
                    ctx.stroke();

                    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
                    ctx.drawImage(avatar, 25, 70, 200, 200);

                    channel.send(`Bienvenue sur **${member.guild.name}**, ${member}!`, new Discord.Attachment(canvas.toBuffer(), "bienvenue.png"));
                }
            }
        }
    }
}