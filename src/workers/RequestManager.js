const DatabaseManager = require('./DatabaseManager');
const Scraper = require('./Scraper');

class RequestManager {
    constructor() {
        this.dbManager = new DatabaseManager();
        this.scraper = new Scraper();
    }

    async requestPosts(userId, query, location, quantity) {
        const region = this.getUserRegion(userId);
        const posts = await this.scraper.makeRequest(region, query, location, quantity);
        return posts;

    }

    registerUser(userId, country) {
        this.dbManager.insertUser(userId, country);
    }

    userExists(userId) {
        return this.dbManager.userExists(userId);
    }

    savePosts(posts, query) {
        this.dbManager.insertPosts(posts, query);
    }

    getUserRegion(userId) {
        return this.dbManager.getUserRegion(userId);
    }

}

module.exports = RequestManager;