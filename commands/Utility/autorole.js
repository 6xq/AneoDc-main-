const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../reconDB');
module.exports = {
    name: 'autorole',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
        if(!message.member.permissions.has('MANAGE_ROLES')) return;
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if(!role) return message.channel.send('Role is not valid!')

        await db.set(`autorole-${message.guild.id}`, role.id);
        message.reply(`${role.name} is now the autorole!`)
        } catch (e) {
            return message.channel.send(`An error has occured please try again later, i maybe not have access to the role.`)
        }
    }
}