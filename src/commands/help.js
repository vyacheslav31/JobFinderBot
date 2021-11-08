const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const postDesc = "Calls the Adzuna API for a new job posting to be displayed if the user's registered.";
const registerDesc = "Allows you to set your country through a dropdown menu to call the Adzuna API."

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Available bot commands'),
    async execute(interaction, bot) {
        const file = new MessageAttachment('./resources/img/JobFinderBot-02.png');
        const messageEmbed = new MessageEmbed()
        .setTitle("Bot Commands")  
        .setDescription("List of available commands.")
        .setColor(bot.adzuna.postColor)
        .setThumbnail('attachment://JobFinderBot-02.png')
        .setFields(
            {name: '/post', value: `${postDesc}`, inline: true}, 
            {name: '/register', value: `${registerDesc}`, inline: true}
        )
        .setAuthor(bot.adzuna.name, bot.user.displayAvatarURL(), bot.adzuna.url)
        .setTimestamp()
        .setFooter('JobFinderBot');
     
        return interaction.reply( { embeds: [messageEmbed], files: [file] , ephemeral: true });
        },
};
