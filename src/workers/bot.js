const { Client, Intents } = require('discord.js');
const DatabaseManager = require("../storage/db_manager");
const RequestManager = require("./request_manager");
const fs = require('fs');
const env = require('dotenv');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9')

class JobFinderBot extends Client {

    constructor() {
        const intents = new Intents([
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES
        ]);
        super({ intents: intents });
        env.config();
        this.commands = [];
        this.requestManager = new RequestManager();
        this.registerCommands();
    }

    init() {
        var log_dir = '../../log';
        if (!fs.existsSync(log_dir)) {
            fs.mkdirSync(log_dir);
        }
        // TODO: setup logging
        this.on('ready', () => {
            console.log(`${this.user.tag} is now active!`);
        });
        this.login(process.env.TOKEN);
    }

    formatPost(post) {
        // TODO: Implement format post method with discord embeds
    }

    registerCommands() {
        var commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith('.js'));

        for(const file of commandFiles) {
            const command = require(`../commands/${file}`);
            this.commands.push(command.data);
        }

        const rest = new REST({ version: '9'}).setToken(process.env.TOKEN);
        (async () => {
            try {
              console.log('Started refreshing application (/) commands.');
          
              await rest.put(
                Routes.applicationGuildCommands(process.env.DISCORD_APP_ID, process.env.CHANNEL),
                { body: this.commands },
              );
              
              console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
              console.error(error);
            }
        })();

        this.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) {
                return;
            }

            const command = this.commands.get(interaction.commandName);
            if (!command) return;

            try {
                command.reply("need help?");
            } catch (error) {
                console.error(error);
                return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        });
    }
}

module.exports = JobFinderBot;