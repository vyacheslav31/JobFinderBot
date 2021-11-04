module.exports = {
    botName: "JobFinderBot",
    staticMapHeight: 100,
    staticMapWidth: 100,
    staticMapZoom: 13,
    staticMapUrl: (longitude, latitude, zoom, width, height) => {
        return `https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${longitude},${latitude}&z=${zoom}&l=map&size=${width},${height}`;
    },
    mapBaseUrl: (latitude, longitude) => {
        return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    },
    iconUrls: {
        success: 'https://i.imgur.com/l8TP5bg.png',
        error: 'https://i.imgur.com/EljOMTr.png',
    },
    messageColors: {
        success: "#32a852",
        error: "#de2121",
    },
    messages: {
        unregistered: 'Please use `/register` first.\n(We need to know which country to look for job postings in)',
        alreadyRegistered: 'You are already registered.',
        registerConfirmation: 'Thank you! You have been registered.',
        postsUnavailable: 'Sorry, we couldn\'t find any posts. Try searching for something else.',
        countrySelect: 'Please select your country from the dropdown menu below.',
    },
}