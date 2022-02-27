const radioEarthKm = 6371;
Number.prototype.toRad = function() {
    return (this * Math.PI) / 180;
};

const distanceKm = function(pointA, pointB) {
    return new Promise((resolve) => {
        if (typeof pointA == "object" && typeof pointB == "object") {
            var diferenciaLat = (pointB.lat - pointA.lat).toRad();
            var diferenciaLon = (pointB.lon - pointA.lon).toRad();
            var a =
                Math.sin(diferenciaLat / 2) * Math.sin(diferenciaLat / 2) +
                Math.cos(pointA.lat.toRad()) *
                Math.cos(pointB.lat.toRad()) *
                Math.sin(diferenciaLon / 2) *
                Math.sin(diferenciaLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = radioEarthKm * c;
            return resolve(d);
        }
    })
}
console.log("Eu");
console.log(
    distanceKm({
        lat: -33.580158,
        lon: -70.567227,
    }, {
        lat: -33.580053,
        lon: -70.568502,
    })
);

/**
 * Convierte grados a radianes.
 *
 * @param degrees Number of degrees.
 */
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

/**
 * Devuelve la distancia entre 2 puntos de coordenadas en Google Maps
 *
 * @see https://stackoverflow.com/a/1502821/4241030
 * @param lat1 Latitude of the point A
 * @param lng1 Longitude of the point A
 * @param lat2 Latitude of the point B
 * @param lng2 Longitude of the point B
 */
function getDistanceBetweenPoints(lat1, lng1, lat2, lng2) {
    // El radio del planeta tierra en metros.
    let R = 6378137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(lng2 - lng1);
    let a = Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat1)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance;
}
console.log(getDistanceBetweenPoints(-33.580158, -70.567227, -33.580053, -70.568502));
//console.log(getDistanceBetweenPoints(-33.580158, -70.567227, -33.580053, -70.568502));

module.exports = {
    distanceKm,
};