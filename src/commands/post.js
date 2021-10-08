const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('post')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        return interaction.reply('Pong!');
    },
};