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
            console.log("====================================");
            console.log(trip);
            console.log("====================================");
            let result = await this.model.create(trip, function(err, result) {
                if (err) {
                    return resolve({ err: err });
                }
                return resolve({ result: result });
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
            console.table(opts)
            console.log(filters);
            this.model
                .find(filters, null, opts)
                .exec(function(err, docs) {
                    console.log(docs);
                    if (err) {
                        return resolve({ err: err });
                    }
                    let data = docs.map((element) => {
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
                        };

                        return newTrip;
                    });

                    return resolve({ readings: data });
                });
        });
    }
}

module.exports = Trip;