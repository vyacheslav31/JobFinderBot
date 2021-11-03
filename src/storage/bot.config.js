module.exports = {
    staticMapHeight: 100,
    staticMapWidth: 100,
    staticMapZoom: 13,
    staticMapUrl: (longitude, latitude, zoom, width, height) =>  {
        return `https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${longitude},${latitude}&z=${zoom}&l=map&size=${width},${height}`;
    },
    mapBaseUrl: (latitude, longitude) => {
        return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    }
}