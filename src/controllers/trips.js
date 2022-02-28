const { Router } = require("express");
const api = Router();
const { Trip } = require("../models/")
const { getAddress } = require("../utils/reverse_geocoding")
const { getMilliseconds } = require("../utils/minutes");
const { distanceKm } = require('../utils/harversine')
const { boundingBox } = require("../utils/bounding_box");
api.get("/", async function(req, res) {
    let model = new Trip();
    const { start_gte, start_lte, distance_gte, limit, offset } = req.query;
    let filters = {}
    if (start_gte != undefined) {
        filters = {
            "start.time": { $gte: parseInt(start_gte) }
        }
    }
    if (start_lte != undefined) {
        filters = {
            "start.time": { $lte: parseInt(start_lte) },
        };
    }
    if (distance_gte != undefined) {
        filters.distance_gte = distance_gte;
    }
    let data = await model.all({
        filters: filters,
        limit: limit,
        offset: offset,
    });
    return res.status(200).json(data)
});
api.post("/", async(req, res) => {
    let body = req.body

    let model = new Trip();

    let readings = body.readings.map((element) => {
        if (element.time != undefined && element.time > 0) {
            return element;
        }
    });
    if (readings.length < 5) {
        return res.status(409).json({
            "msg": "min 5 readings required",
        });
    }
    let overspeedsCount = 0;
    readings.map((element, index) => {
        console.log(`Speed: ${element.speed}, speedLimit:${element.speedLimit}`)
        if (element.speed >= element.speedLimit) {
            if (index == 0) {
                overspeedsCount += 1;
            } else if (readings[index - 1].speed < readings[index - 1].speedLimit) {
                overspeedsCount += 1;
            }
        }
    })
    let start = Math.min.apply(Math, readings.map((element) => element.time));
    let end = Math.max.apply(Math, readings.map((element) => element.time));
    let readingStart = readings.find((element) => {
        if (element.time == start) {
            return element;
        }
    })
    let readingEnd = readings.find((element) => {
        if (element.time == end) {
            return element;
        }
    })

    let { data } = await getAddress({ lat: readingStart.location.lat, lon: readingStart.location.lon });
    let { data: dataEnd } = await getAddress({
        lat: readingEnd.location.lat,
        lon: readingEnd.location.lon,
    });

    //get duration of trip
    let duration = await getMilliseconds({ start: start, end: end });

    //get distance in kilometers of trip
    let kilometers = 0;
    await readings.map(async(element, index) => {
        if (index > 0) {
            let distance = await distanceKm(readings[index - 1].location, element.location);
            return kilometers += distance;
        }
    })

    let dataBoundingBox = await boundingBox([{
            lat: readingStart.location.lat,
            lon: readingStart.location.lon,
        },
        {
            lat: readingEnd.location.lat,
            lon: readingEnd.location.lon,
        }
    ]);
    let finalDataBoundingBox = [{
            type: "Point",
            coordinates: [
                dataBoundingBox.topLeft.lat,
                dataBoundingBox.topLeft.lon
            ],
        },
        {
            type: "Point",
            coordinates: [dataBoundingBox.bottomRight.lat, dataBoundingBox.bottomRight.lon],
        },
    ];

    let trip = {
        start: {
            location: {
                type: "Point",
                coordinates: [readingStart.location.lat, readingStart.location.lon],
            },
            time: readingStart.time,
            address: data != undefined ? data[0].name : "not found",
        },
        end: {
            location: {
                type: "Point",
                coordinates: [readingEnd.location.lat, readingEnd.location.lon],
            },
            time: readingEnd.time,
            address: dataEnd != undefined ? dataEnd[0].name : "not found",
        },
        distance: kilometers,
        duration: duration,
        overspeedsCount: overspeedsCount,
        boundingBox: finalDataBoundingBox,
    };

    let { result, err } = await model.add(trip.start, trip.end, trip.distance, trip.duration, trip.overspeedsCount, trip.boundingBox)
    if (result) {
        return res.status(201).json(result);
    }
    res.status(409).json({
        err: err,
    });
})
module.exports = api;