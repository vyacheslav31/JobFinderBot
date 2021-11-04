const { SlashCommandBuilder } = require('@discordjs/builders');

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
            const postsLen = posts.length;
            var formattedPost = null;

            switch (postsLen) {
                case 0:
                    formattedPost = bot.formatMessage('postsUnavailable');
                    return interaction.reply({ embeds: [formattedPost], ephemeral: true })
                case 1:
                    const post = posts[0];
                    formattedPost = bot.formatPost(post);
                    return interaction.reply({ embeds: [formattedPost], ephemeral: true }) && bot.requestManager.savePosts(posts, query);
                default:
                // CASE WHERE POSTS > 1
                // TODO: Implement this case.
            }
        }
        catch (except) {
            console.log(except);
            return interaction.reply({ content: "An error occured.", ephemeral: true });
        }

    }
};