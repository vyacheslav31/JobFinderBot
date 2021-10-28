const axios = require('axios');
const requestUrl = require('../storage/api_config').Adzuna.requestUrl;


/**
 * The purpose of this class is to make various API requests to obtain job postings.
 */
class Scraper {
    constructor() {
        this.makeJobRequest('ca', 1, 1, "software%20developer", "montreal");
    }

   
    /**
     * 
     * @param {Country [ca, br, etc...]} country 
     * @param {Number of Pages [1, 2, 3, etc...]} pages 
     * @param {Number of Results per Page} results 
     * @param {Query [Engineer, Accountant, etc...]} what 
     * @param {Location [City, PostalCode]} where 
     */
    makeJobRequest(country, pages = 1, results = 1, what, where) {
        axios.get(requestUrl(
            process.env.ADZUNA_APP_ID,
            process.env.ADZUNA_APP_KEY,
            country,
            pages,
            results,
            what,
            where
        )
        ).then((response) => {
            console.log(response.data);
        });
    }
}

module.exports = Scraper;