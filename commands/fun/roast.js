const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    name: 'roast',
    description: 'Roasts a user',
    usage: '@user',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send(`${client.error} Whom are you roasting? mention them`)
        const mentions = message.mentions.members.first();
        if(!mentions) return message.lineReply(`${client.error} I could not find that user.`)
        if(mentions.user.id === message.author.id) return message.channel.send(`${client.error} LMFAO IMAGINE ROASTING YOUR SELF`)
        if(mentions.user.bot) return message.channel.send(`${client.error} LMFAO IMAGINE ROASTING A THING THAT ISN'T EVEN ALIVE IN REAL LIFE`)
        let msg = await message.channel.send(`${client.yes} Preparing a roast...`)
        fetch(`https://evilinsult.com/generate_insult.php?lang=en&type=json`)
            .then(res => res.json())
            .then(json => {
                const roasted = new MessageEmbed()
                .setDescription(` ${mentions.user.tag} ${json.insult}`)
                .setColor('RANDOM')
                .setFooter(`Lmfao they just got roasted | The developer doesn't controll the roasts.`)
                msg.delete();
                message.channel.send(roasted)
            })
    }
}