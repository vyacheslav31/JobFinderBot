const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDefaultPermission(true)
		.setDescription('Register yourself with JobFinderBot.'),
	/** */
	async execute(interaction, bot) {
		const formattedMsg = bot.formatMessage('countrySelect');
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