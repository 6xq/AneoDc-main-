const { fight } = require("weky")
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'fight',
    aliases: ['f'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const oppenent = message.mentions.users.first();
        if (!oppenent) return message.channel.send(`Please mention who you want to fight`);
    const { fight } = require('weky')
    const x = new fight({
        client: client,
        message: message,
        acceptMessage: 'Click to fight with <@' + message.author + '>',
        challenger: message.author,
        opponent: message.mentions.users.first(),
        hitButtonText: 'Hit',
        hitButtonColor: 'red',
        healButtonText: 'Heal',
        healButtonColor:  'green',
        cancelButtonText: 'Cancel',
        cancelButtonColor: 'blurple',
    })
    x.start()
    //ERRORS? Join our support server https://discord.gg/2EZSpxNB5z (Weky Npm Official)
    }
}