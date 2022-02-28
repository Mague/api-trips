const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Trip = require("./trip")
dotenv.config()

const {
    MONGODB_URL = `mongodb://mongo/trips`,
        MONGODB_URL_TEST = "mongodb://mongo/test_trips",
        NODE_ENV,
} = process.env;

const init = () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
    };
    const url = NODE_ENV == "test" ? MONGODB_URL_TEST : MONGODB_URL;
    return mongoose.connect(url, options);
};

const dropDatabase = () => {
    if (NODE_ENV == "test") return mongoose.connection.db.dropDatabase();
};

module.exports = {
    Trip,
    init,
    dropDatabase,
};