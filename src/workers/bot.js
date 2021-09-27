const { Client, Collection, Intents } = require('discord.js');
const DatabaseManager = require("../storage/db_manager");
const RequestManager = require("./request_manager");


class JobFinderBot extends Client {

    constructor(props) {
        const myIntents = new Intents([
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES
        ]);
        super({intents: myIntents});
        require('dotenv').config();
        this.commands = new Collection();
        this.requestManager = new RequestManager();
        this.registerCommands();
    }

    init() {
        // TODO: setup logs folder
        // TODO: setup logging
        this.login(process.env.TOKEN);
    }

    formatPost(post) {
        // TODO: Implement format post method with discord embeds
    }

    registerCommands() {

    }
}

module.exports = JobFinderBot;