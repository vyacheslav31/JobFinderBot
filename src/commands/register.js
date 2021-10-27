const { SlashCommandBuilder } = require('@discordjs/builders');
const { DatabaseManager } = require('../storage/db_manager');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDefaultPermission(true)
		.setDescription('Register your'),
	async execute(interaction, db) {	;
		return interaction.reply('Pong!');
	},
};