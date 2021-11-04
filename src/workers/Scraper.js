const axios = require('axios');
const requestUrl = require('../storage/api.config').Adzuna.requestUrl;

/**
 * The purpose of this class is to make various API requests to obtain job postings.
 */
class Scraper {
    constructor() {

    }

    /**
     * User-initiated API search which will return the results based on a query.
     * @param {*} country - The country to search in.
     * @param {*} what  - What to search for.
     * @param {*} where  - The location within the country to look for.
     * @param {*} results - How many results to run.
     * @param {*} page - Which page of the results to look at.
     * @returns 
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