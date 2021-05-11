const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require(`../../models/bio`);
module.exports = {
	name: 'bio',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
        const p = await client.prefix(message)
		let member = message.mentions.members.first();
		if (!member) {
			member = message.member;
		}
		let data = await Schema.findOne({ User: member.id });
		if (!data) {
			return message.reply(
				new MessageEmbed({
					title: 'Error!',
					description: `${member.toString()} doesn't have a bio`,
                    color: "RANDOM"
				})
			);
		}
		message.reply(
			new MessageEmbed()
				.setTitle(`${member.user.tag}'s Bio`)
				.setDescription(data.Bio)
				.setColor("RANDOM")
				.setFooter(`Use \`${p}set-bio <bio>\` to set your bio`)
				.setThumbnail(member.user.displayAvatarURL({ dynamicdy: true }))
		);
	}
};
