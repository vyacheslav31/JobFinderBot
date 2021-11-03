const { Client, Collection, Intents } = require('discord.js');
const DatabaseManager = require("../storage/db_manager");
const RequestManager = require("./request_manager");
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const env = require('dotenv');
const log_dir = '../../log';
const botConfig = require('../storage/bot_config');
const apiConfig = require('../storage/api_config');


class JobFinderBot extends Client {

    constructor() {
        const intents = new Intents([
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES
        ]);
        super({ intents: intents });
        env.config();
        this.commands = new Collection();
        this.requestManager = new RequestManager();
        this.adzuna = apiConfig.Adzuna;
        this.config = botConfig;
    }

    init() {
        // Ensure logging folder exists
        if (!fs.existsSync(log_dir)) {
            fs.mkdirSync(log_dir);
        }
        // TODO: setup logging
        // Register all available bot commands
        this.registerCommands();

        // Affirm ready state
        this.on('ready', () => {
            console.log(`${this.user.tag} is now active!`);
        });
        this.login(process.env.DISCORD_TOKEN);
    }

    /**
     * This function does 2 things: 
     * 1. It reads the command files into the 'Commands' collection. They are later used to invoke the commands and return the appropriate responses.
     * 2. It attaches all the possible event listeners to the bot.
     */
    registerCommands() {
        // Read and register the command files with the bot
        let commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            this.commands.set(command.data.name, command);
        }

        // Attach command event listener
        this.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;

            const command = this.commands.get(interaction.commandName);

            if (typeof this.requestManager.userExists(interaction.user.id) == 'undefined' && command.data.name !== 'register') {
                const formattedMsg = new MessageEmbed()
                .setColor(this.adzuna.postColor)
                .setDescription('Please use `/register` first. (We need to know which country to look for job postings in)')
                .setTimestamp()
                .setFooter('JobFinderBot');
                return interaction.reply({ embeds: [formattedMsg], ephemeral: true })
            }

            if (!command) return;

            // Attempt to execute user command
            try {
                await command.execute(interaction, this);
            } catch (error) {
                console.error(error);
                return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }

        });

        // Attach menu selection event listener
        this.on('interactionCreate', async interaction => {
            if (!interaction.isSelectMenu()) return;

            switch (interaction.customId) {
                case 'region_select':
                    try {
                        const formattedMsg = new MessageEmbed()
                            .setColor(this.adzuna.postColor)
                            .setDescription('Thank you! You have been registered.')
                            .setTimestamp()
                            .setFooter('JobFinderBot');
                        this.requestManager.registerUser(interaction.member.user.id, interaction.values[0]);
                        await interaction.update({ embeds: [formattedMsg], components: [], ephemeral: true });
                    }
                    catch (SqliteError) {
                        // TODO: Etheir create an `update` command or overwrite existing country in DB if user re-registers
                        console.log(SqliteError)
                        await interaction.reply({ content: "You have already been registered.", ephemeral: true });
                    }
            }
        });
    }

    formatPost(post) {
        // TODO: Implement format post method with discord embeds
    }
}

module.exports = JobFinderBot;