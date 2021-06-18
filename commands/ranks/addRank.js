const RankSchema = require('../../models/ranks')
const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'addrank',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
    if(!message.member.permissions.has('ADMINISTRATOR')) return;

    const rankName = args.slice(1).join(" ")
    const role = message.mentions.roles.first()

    if(!role) return message.reply('Please tell me a role.')
    if(!rankName) return message.reply('Please tell me a rank')
    RankSchema.findOne(
        { Guild: message.guild.id, Rank: rankName },
         async(err, data) => {
        if(data) return message.channel.send('This rank already exists');
        else {
            data = new RankSchema({
                Guild: message.guild.id,
                Rank: rankName,
                Role: role.id
            });
            data.save();
            message.channel.send(`${role} is now a new rank! ➡ ${rankName}`);
            }
        }
    );
      } catch (e) {
        return message.channel.send(`An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`)
      }
  },
};