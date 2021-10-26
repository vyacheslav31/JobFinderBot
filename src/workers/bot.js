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
        this.login(process.env.DISCORD_TOKEN);
    }

    formatPost(post) {
        // TODO: Implement format post method with discord embeds
    }
}

module.exports = JobFinderBot;