module.exports = {
    Adzuna: {
        name: "Adzuna",
        url: "https://www.adzuna.com",
        icon: "https://i.ibb.co/ryxpxNC/adzuna-logo.png",
        regions: {
            "Great Britain": "gb",
            "Austria": "at",
            "Australia": "au",
            "Brazil": "br",
            "Canada": "ca",
            "Germany": "de",
            "France": "fr",
            "India": "in",
            "Italy": "it",
            "Netherlands": "nl",
            "New Zealand": "nz",
            "Poland": "pl",
            "Russia": "ru",
            "Singapore": "sg",
            "United States": "us",
            "South Africa": "za"
        },
        requestUrl: (appId, appKey, country, pages, results, what, where) => {
            return `https://api.adzuna.com/v1/api/jobs/${country}/search/${pages}?app_id=${appId}&app_key=${appKey}&results_per_page=${results}&what=${what}&where=${where}`;
        }
        
    }
}