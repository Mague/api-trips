let schema = require('./schemas/trip');
class Trip {
    constructor() {
        this.model = schema;
    }

    /**
     *
     *
     * @param {*} start
     * @param {*} end
     * @param {*} distance
     * @param {*} duration
     * @param {*} overspeedsCount
     * @param {*} boundingBox
     * @returns
     * @memberof Trip
     */
    async add(start, end, distance, duration, overspeedsCount, boundingBox) {
        return new Promise(async(resolve) => {
            let trip = {
                start: start,
                end: end,
                distance: distance,
                duration: duration,
                overspeedsCount: overspeedsCount,
                boundingBox: [...boundingBox],
            };

            let result = await this.model.create(trip, function(err, result) {
                if (err) {
                    return resolve({ err: err });
                }
                let newBoundingBox = result.boundingBox.map((b) => {
                    let bounding = {
                        lat: b.coordinates[0],
                        lon: b.coordinates[1],
                    };
                    return bounding;
                });
                let newTrip = {
                    id: result._id,
                    start: {
                        lat: result.start.lat,
                        lon: result.start.lon,
                        address: result.start.address,
                        time: result.start.time,
                    },
                    end: {
                        lat: result.end.lat,
                        lon: result.end.lon,
                        address: result.end.address,
                        time: result.end.time,
                    },
                    distance: result.distance,
                    duration: result.duration,
                    overspeedsCount: result.overspeedsCount,
                    boundingBox: newBoundingBox,
                };
                return resolve({ result: newTrip });
            });
        });
    }

    async all({ filters, limit, offset }) {
        return new Promise(async(resolve) => {
            //let skip = page == 1 ? 0 : limit * offset;
            let opts = {}
            if (limit != undefined) {
                opts.limit = parseInt(limit);
            }
            if (offset != undefined) {
                opts.skip = parseInt(offset);
            }

            this.model
                .find(filters, null, opts)
                .exec(function(err, docs) {
                    if (err) {
                        return resolve({ err: err });
                    }
                    let data = docs.map((element) => {
                        let newBoundingBox = element.boundingBox.map((b) => {
                            console.table(b)
                            let bounding = {
                                lat: b.coordinates[0],
                                lon: b.coordinates[1],
                            };
                            console.table(bounding);
                            return bounding;
                        });
                        console.table(newBoundingBox)
                        let newTrip = {
                            id: element._id,
                            start: {
                                lat: element.start.lat,
                                lon: element.start.lon,
                                address: element.start.address,
                                time: element.start.time,
                            },
                            end: {
                                lat: element.end.lat,
                                lon: element.end.lon,
                                address: element.end.address,
                                time: element.end.time,
                            },
                            distance: element.distance,
                            duration: element.duration,
                            overspeedsCount: element.overspeedsCount,
                            boundingBox: newBoundingBox,
                        };

                        return newTrip;
                    });

                    return resolve({ readings: data });
                });
        });
    }
}

module.exports = Trip;