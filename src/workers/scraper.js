const axios = require('axios');
const requestUrl = require('../storage/api_config').Adzuna.requestUrl;


/**
 * The purpose of this class is to make various API requests to obtain job postings.
 */
class Scraper {
    constructor() {

    }


    /**
     * User-initiated API search which will return the results based on a query.
     * @param {Country [ca, br, etc...]} country 
     * @param {Number of Pages [1, 2, 3, etc...]} pages 
     * @param {Number of Results per Page} results 
     * @param {Query [Engineer, Accountant, etc...]} what 
     * @param {Location [City, PostalCode]} where 
     */
    async makeRequest(country, what, where = '', results = 1, page = 1,) {
        what = encodeURIComponent(what.trim());
        where = encodeURIComponent(where.trim());

        const posts = await axios.get(requestUrl(
            process.env.ADZUNA_APP_ID,
            process.env.ADZUNA_APP_KEY,
            country,
            page,
            results,
            what,
            where
        )
        ).then((response) => {
            return response.data.results;
        });
      
        return posts;
    }
}

module.exports = Scraper;