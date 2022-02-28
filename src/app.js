const express = require("express");
const dotenv = require("dotenv");
const db = require("./models");
const http = require("http");
const path = require("path");
const controllers = require("./controllers");
dotenv.config();
const bodyParser = require('body-parser')

const app = express();
const server = http.createServer(app);
const { HTTP_PORT = 3000 } = process.env;
const { HTTP_PORT_TEST = 3001 } = process.env;
app.use(
    bodyParser.urlencoded({
        parameterLimit: 10000,
        limit: 1024 * 1024 * 10,
        extended: true,
    })
);

app.use(
    bodyParser.json({
        parameterLimit: 10000,
        limit: 1024 * 1024 * 10,
        type: "application/json",
    })
);
app.use("/api/trips/v1", controllers.trips);

function start() {
    return new Promise((resolve, reject) => {
        let port = (process.env.NODE_ENV == "test") ? HTTP_PORT_TEST : HTTP_PORT;
        server.listen(port, async(err) => {
            if (err) return reject(err);
            console.log(`server listener running: http://localhost:${port}`);
            await db.init();
            resolve();
        });
    });
}

function close() {
    server.close();
    process.exit(0);
}

module.exports = { start, close, app };