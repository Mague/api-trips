const { getBoundingBox } = require("geolocation-utils");

const boundingBox = function(locations) {
    return new Promise((resolve) => {
        return resolve(getBoundingBox(locations));
    })
}
module.exports = {
    boundingBox,
};
/* console.log(getBoundingBox([{
            lat: -33.580158,
            lon: -70.567227
        },
        {
            lat: -33.580053,
            lon: -70.568502,
        }
    ], 1000)) */
//http://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/-33.580158,-70.567227.json?access_token=pk.eyJ1IjoibWFndWUiLCJhIjoiY2twZnp6NmQwMDQzZDJybXpjOGl2dnRrYyJ9.jovWG5uV93Ow208JAPEi_Q
//https://api.mapbox.com/geocoding/v5/mapbox.places/-33.580158,-70.567227.json?access_token=pk.eyJ1IjoibWFndWUiLCJhIjoiY2twZnp6NmQwMDQzZDJybXpjOGl2dnRrYyJ9.jovWG5uV93Ow208JAPEi_Q
//https://api.mapbox.com/directions-matrix/v1/mapbox/driving/-33.580158,-70.567227;-33.580053,-70.568502;?approaches=curb;curb;curb&access_token=pk.eyJ1IjoibWFndWUiLCJhIjoiY2twZnp6NmQwMDQzZDJybXpjOGl2dnRrYyJ9.jovWG5uV93Ow208JAPEi_Q