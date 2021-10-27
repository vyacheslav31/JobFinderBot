const { Client, Collection, Intents } = require('discord.js');
const DatabaseManager = require("../storage/db_manager");
const RequestManager = require("./request_manager");
const fs = require('fs');
const env = require('dotenv');
const log_dir = '../../log';
const config = require('../storage/bot_config');
const { exit } = require('process');

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
        this.dbManager = new DatabaseManager();
    }

    init() {
        if (!fs.existsSync(log_dir)) {
            fs.mkdirSync(log_dir);
        }
        // TODO: setup logging
        this.on('ready', () => {
            console.log(`${this.user.tag} is now active!`);
        });
        this.registerCommands();
        this.login(process.env.DISCORD_TOKEN);
        
        // Listen for interactions
        this.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;

            const command = this.commands.get(interaction.commandName);

            if (!command) return;

            // Attempt to execute command
            try {
                await command.execute(interaction, this.dbManager);
            } catch (error) {
                console.error(error);
                return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }

        });
    }

    /**
     * This function reads the command files into the 'Commands' collection.
     * - Which are later used to invoke the commands and return the appropriate responses
     */
    registerCommands() { 
        let commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
       
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            this.commands.set(command.data.name, command);
        }
    }

    formatPost(post) {
        // TODO: Implement format post method with discord embeds
    }
}

module.exports = JobFinderBot;