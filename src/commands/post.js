const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('post')
        .setDescription('Fetches a job posting.')
        .addStringOption(option => 
            option.setName('search')
            .setDescription('Indicate the terms to search for.')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('location')
            .setDescription('Specifies the location of the job posting')
            .setRequired(false))
        .addIntegerOption(option =>
            option.setName('quantity')
            .setDescription('Specifies the quantity of posts to retrieve')
            .setRequired(false)),
    async execute(interaction, bot) {
        const userId = interaction.user.id;
        const query = interaction.options.getString('search');
        const location = interaction.options.getString('location');
        const quantity = interaction.options.getInteger('quantity');

        try {
            const posts = await bot.requestManager.requestPosts(...[userId, query, location, quantity].filter((arg) => {
                return arg != null;
            }));
         
            // Format Post via DiscordEmbed
            const formattedPost = new MessageEmbed()
            .setColor(bot.adzuna.postColor)
            .setTitle(posts.title)
            .setAuthor(bot.adzuna.name, bot.adzuna.icon, bot.adzuna.url)
            .setURL(posts.redirect_url)
            .setThumbnail(bot.config.staticMapUrl(
                posts.longitude,
                posts.latitude,
                bot.config.staticMapZoom,
                bot.config.staticMapWidth,
                bot.config.staticMapHeight
            ))
            .addFields(
                { name: 'Map', value: bot.config.mapBaseUrl(posts.latitude, posts.longitude), inline: true},
                { name: 'Company', value: posts.company.display_name, inline: false},
                { name: 'Location', value: posts.location.display_name, inline: true},
                { name: 'Post Date', value: Date(posts.created).toLocaleString(), inline: true},
                { name: 'Category', value: posts.category.label, inline: true},
                { name: 'Description', value: posts.description, inline: false},
            )
            .setTimestamp()
            .setFooter('JobFinderBot');

            return interaction.reply({ embeds: [formattedPost], ephemeral: true }) && bot.requestManager.savePosts(posts, query);
        }
        catch (except) {
            console.log(except);
            return interaction.reply({content:"An error occured.", ephemeral: true});
        }

    }
};