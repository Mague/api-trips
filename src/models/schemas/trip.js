const mongoose = require('mongoose');
const opts = {
    toJSON: { virtuals: true },
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
};
const { Schema } = mongoose;
const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});
const trip = new Schema({
        start: {
            time: {
                type: Number,
                required: true,
                validate: {
                    validator: Number.isInteger,
                    message: "{VALUE} is not an integer value",
                },
            },
            location: {
                type: pointSchema,
                index: "2dsphere", // Create a special 2dsphere index on `City.location`
            },
            address: {
                type: String,
                required: true,
            },
        },
        end: {
            time: {
                type: Number,
                required: true,
                validate: {
                    validator: Number.isInteger,
                    message: "{VALUE} is not an integer value",
                },
            },
            location: {
                type: pointSchema,
                index: "2dsphereTwo", // Create a special 2dsphere index on `City.location`
            },
            address: {
                type: String,
                required: true,
            },
        },
        distance: { type: Number, required: true },
        duration: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: "{VALUE} is not an integer value",
            },
        },
        overspeedsCount: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: "{VALUE} is not an integer value",
            },
        },
        boundingBox: [{ type: pointSchema, default: [0, 0] }],
    },
    opts
);
trip.index({ location: "2dsphere" });
trip.index({ location: "2dsphereTwo" });

trip.virtual('start.lat').get(function() {
    return this.start.location.coordinates[0];
})
trip.virtual('start.lon').get(function() {
    return this.start.location.coordinates[1];
})

trip.virtual('end.lat').get(function() {
    return this.end.location.coordinates[0];
})
trip.virtual('end.lon').get(function() {
    return this.end.location.coordinates[1];
})
const Trip = mongoose.model("Trip", trip);

module.exports = Trip;