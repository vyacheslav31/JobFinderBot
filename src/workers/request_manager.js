const DatabaseManager = require('../storage/db_manager');
const Scraper = require('./scraper');

class RequestManager {
    constructor() {
        this.dbManager = new DatabaseManager();
        this.scraper = new Scraper();
    }

    requestPost(userId, quantity, query) {
        // logic for submitting requests

        /**
         * If db_manager can find the post in the db return post
         * else request a new post from the scraper and save it in the db, then return it.
         */
    }

    registerUser(userId, country) {

    }

    userExists(userId) {
        
    }



}

module.exports = RequestManager;