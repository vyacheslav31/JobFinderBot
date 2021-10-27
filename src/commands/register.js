const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDefaultPermission(true)
		.setDescription('Register yourself with JobFinderBot.'),
	/** */
	async execute(interaction, bot) {
		const row = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId('region_select')
				.setPlaceholder("No country selected !")
				.setMaxValues(1)
				.addOptions(bot.regionOptions),
		);
		await interaction.reply({ content: 'Please select your country.', ephemeral: true, components: [row] });
	},
};