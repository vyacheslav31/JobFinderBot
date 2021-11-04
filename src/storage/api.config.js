module.exports = {
    Adzuna: {
        name: "Adzuna",
        url: "https://www.adzuna.com",
        logo: "https://i.ibb.co/ryxpxNC/adzuna-logo.png",
        regions: [
            {label:"Great Britain", value:"gb"},
            {label:"Austria", value:"at"},
            {label:"Australia", value:"au"},
            {label:"Brazil", value:"br"},
            {label:"Canada", value:"ca"},
            {label:"Germany", value:"de"},
            {label:"France", value:"fr"},
            {label:"India", value:"in"},
            {label:"Italy", value:"it"},
            {label:"Netherlands", value:"nl"},
            {label:"New Zealand", value:"nz"},
            {label:"Poland", value:"pl"},
            {label:"Russia", value:"ru"},
            {label:"Singapore", value:"sg"},
            {label:"United States", value:"us"},
            {label:"South Africa", value:"za"}
        ],
        requestUrl: (appId, appKey, country, pageNum, results, what, where) => {
            return `https://api.adzuna.com/v1/api/jobs/${country}/search/${pageNum}?app_id=${appId}&app_key=${appKey}&results_per_page=${results}&what=${what}&where=${where}`;
        },
    }
}