const DatabaseManager = require('./DatabaseManager');
const Scraper = require('./Scraper');

class RequestManager {
    constructor() {
        this.dbManager = new DatabaseManager();
        this.scraper = new Scraper();
    }

    async requestPosts(userId, query, location, quantity) {
        // logic for submitting requests

        /**
         * If db_manager can find the post in the db return post
         * else request a new post from the scraper and save it in the db, then return it.
         */
        const region = this.getUserRegion(userId);
        const posts = await this.scraper.makeRequest(region, query, location, quantity);
        await savePosts(posts, query);
        return posts;

    }

    registerUser(userId, country) {
        this.dbManager.insertUser(userId, country);
    }

    userExists(userId) {
        return this.dbManager.userExists(userId);
    }

    async savePosts(posts) {
        await this.dbManager.insertPosts(posts);
    }

    async getUserRegion(userId) {
        await this.dbManager.getUserRegion(userId);
    }



}

module.exports = RequestManager;