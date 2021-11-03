const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDefaultPermission(true)
		.setDescription('Register yourself with JobFinderBot.'),
	/** */
	async execute(interaction, bot) {
		const formattedMsg = new MessageEmbed()
		.setColor(bot.adzuna.postColor)
		.setDescription('Please select your country from the dropdown menu below.')
		.setTimestamp()
		.setFooter('JobFinderBot');

		const row = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId('region_select')
				.setPlaceholder("No country selected !")
				.setMaxValues(1)
				.addOptions(bot.adzuna.regions),
		);
		await interaction.reply({ embeds: [formattedMsg], ephemeral: true, components: [row] });
	},
};