const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const RequestManager = require("./RequestManager");
const fs = require('fs');
const env = require('dotenv');
const log_dir = '../../log';
const botConfig = require('../storage/bot.config');
const apiConfig = require('../storage/api.config');
const help = require('../commands/help');


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
            let formattedMsg = null;
            let userExists = typeof this.requestManager.userExists(interaction.user.id) !== 'undefined'

            if (!userExists && command.data.name !== 'register') {
                formattedMsg = this.formatMessage('unregistered');
                return interaction.reply({ embeds: [formattedMsg], ephemeral: true })
            }
            else if (userExists && command.data.name == 'register') {
                formattedMsg = this.formatMessage('alreadyRegistered');
                return interaction.reply({ embeds: [formattedMsg], ephemeral: true });
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
                        const formattedMsg = this.formatMessage('registerConfirmation');
                        this.requestManager.registerUser(interaction.member.user.id, interaction.values[0]);
                        await interaction.update({ embeds: [formattedMsg], components: [], ephemeral: true });
                    }
                    catch (SqliteError) {
                        // TODO: Etheir create an `update` command or overwrite existing country in DB if user re-registers
                        console.log(SqliteError)
                    }
            }
        });
    }

    formatMessage(postType) {
        let newMessage = new MessageEmbed();
        let color, description, icon = null;        
    
        switch (postType) {            
            case 'unregistered':
                color = this.config.messageColors.error;
                description = this.config.messages.unregistered;
                icon = this.config.iconUrls.error;
                break;
            case 'alreadyRegistered':
                color = this.config.messageColors.error;
                description = this.config.messages.alreadyRegistered;
                icon = this.config.iconUrls.error;
                break;
            case 'registerConfirmation':
                color = this.config.messageColors.success;
                description = this.config.messages.registerConfirmation;
                icon = this.config.iconUrls.success;
                break;
            case 'countrySelect':
                color = this.config.messageColors.success;
                description = this.config.messages.countrySelect;
                icon = this.config.iconUrls.success;
                break;
            case 'postsUnavailable':
                color = this.config.messageColors.error;
                description = this.config.messages.postsUnavailable;
                icon = this.config.iconUrls.error;
                break;
            case 'helpCommand':                
                color = this.config.messageColors.success;
                description = this.config.messages.helpCommand;
                icon = this.config.iconUrls.success;                          
                newMessage
                .setFields(this.config.messages.commands)                                   
                break;
        }
              
        return newMessage
            .setColor(color)
            .setDescription(description)        
            .setFooter(this.config.botName, icon);
        
    }

    formatPost(post) {
        return new MessageEmbed()
            .setColor(this.adzuna.postColor)
            .setTitle(post.title)
            .setAuthor(this.adzuna.name, this.adzuna.icon, this.adzuna.url)
            .setURL(post.redirect_url)
            .setThumbnail(this.config.staticMapUrl(
                post.longitude,
                post.latitude,
                this.config.staticMapZoom,
                this.config.staticMapWidth,
                this.config.staticMapHeight
            ))
            .addFields(
                { name: 'Map', value: this.config.mapBaseUrl(post.latitude, post.longitude), inline: true },
                { name: 'Company', value: post.company.display_name, inline: false },
                { name: 'Location', value: post.location.display_name, inline: true },
                { name: 'Post Date', value: Date(post.created).toLocaleString(), inline: true },
                { name: 'Category', value: post.category.label, inline: true },
                { name: 'Description', value: post.description, inline: false },
            )
            .setTimestamp()
            .setFooter(this.config.botName);
    }

    formatHelpMessage() {
        const file = new MessageAttachment('./resources/img/JobFinderBot-02.png');
        return messageEmbed = new MessageEmbed()
        .setTitle("Bot Commands")  
        .setDescription("List of available commands.")
        .setColor(bot.adzuna.postColor)
        //.setThumbnail('attachment://JobFinderBot-02.png')
        .setFields(
            {name: '/post', value: this.config.registerDescription, inline: true}, 
            {name: '/register', value: this.config.postDescription, inline: true}
        )
        .setAuthor(bot.adzuna.name, bot.user.displayAvatarURL(), bot.adzuna.url)
        .setTimestamp()
        .setFooter('JobFinderBot');

    }
}

module.exports = JobFinderBot;