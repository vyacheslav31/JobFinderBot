const { Client, Collection, Intents } = require('discord.js');
const DatabaseManager = require("../storage/db_manager");
const RequestManager = require("./request_manager");
const env = require('dotenv');


class JobFinderBot extends Client {

    constructor(props) {
        this.commandFiles = fs.readdirSync("../commands").filter(file => file.endsWith('.js'));
        const intents = new Intents([
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES
        ]);
        super({ intents: intents });
        env.config();
        this.commands = new Collection();
        this.requestManager = new RequestManager();
        this.registerCommands();
    }

    init() {
        // TODO: setup logs folder
        // TODO: setup logging
        this.on('ready', () => {
            console.log(`${this.user.tag} is now active.`);
        });
        this.login(process.env.TOKEN);
    }

    formatPost(post) {
        // TODO: Implement format post method with discord embeds
    }

    registerCommands() {
        for(const file of this.commandFiles) {
            const command = require(`./commands/${file}`);
            this.commands.set(command.data.name, command);
        }

        this.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) {
                return;
            }

            const command = this.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        });
    }
}

module.exports = JobFinderBot;