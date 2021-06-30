const { MessageEmbed } = require("discord.js");
const ee = require("../../config.json");
const { format } = require("../../handlers/functions")
module.exports = {
    name: "rewind",
    category: "Music",
    aliases: ["rew"],
    cooldown: 4,
    useage: "rewind <Time in Seconds>",
    description: "Rewinds for a specific amount of Time",
    run: async (client, message, args, cmduser, text) => {
    try{
        const prefix = await client.prefix(message);
      const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Oops~ | Please join a Channel first`)
        );
      if(!client.distube.getQueue(message))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Oops~ | I am not playing anything`)
          .setDescription(`The Queue is empty`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Oops~ | Please join **my** Channel first`)
          .setDescription(`I am in channel: \`${message.guild.me.voice.channel.name}\``)
        );
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Oops~ | You didn't provide a time you want to rewind!`)
          .setDescription(`Usage: \`${prefix}seek 10\``)
        )

      let queue = client.distube.getQueue(message);
      let seektime = queue.currentTime - Number(args[0]) * 1000;
      if(seektime < 0)
        seektime = 0;
      if(seektime >= queue.songs[0].duration * 1000 - queue.currentTime)
        seektime = 0;

      client.distube.seek(message, seektime);

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext,ee.footericon)
        .setTitle(`⏩ Forwarded for \`${args[0]} Seconds\` to: ${format(seektime)}`)
      ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`Oops~ | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}