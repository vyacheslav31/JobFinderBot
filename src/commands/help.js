const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const postDesc = "Calls the Adzuna API for a new job posting to be displayed if the user's registered.";
const registerDesc = "Allows you to set your country through a dropdown menu to call the Adzuna API."

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Available bot commands'),
    async execute(interaction, bot) {
        const formattedMsg = bot.formatMessage('helpCommand');
        
        return interaction.reply( { embeds: [formattedMsg] , ephemeral: true });
        },
};
