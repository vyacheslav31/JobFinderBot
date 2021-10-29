const DatabaseManager = require('../storage/db_manager');
const Scraper = require('./scraper');

class RequestManager {
    constructor() {
        this.dbManager = new DatabaseManager();
        this.scraper = new Scraper();
    }

    async requestPost(userId, query, location, quantity) {
        // logic for submitting requests

        /**
         * If db_manager can find the post in the db return post
         * else request a new post from the scraper and save it in the db, then return it.
         */

        return await this.scraper.makeRequest('ca', query);

        // TODO: Actually save the posts in the db
        // this.savePosts(posts);

    }

    registerUser(userId, country) {
        this.dbManager.insertUser(userId, country);
    }

    userExists(userId) {
        const result = this.dbManager.userExists(userId);
        process.exit();
    }

    savePosts(posts) {

    }



}

module.exports = RequestManager;