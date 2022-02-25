const express = require("express");
const dotenv = require("dotenv");
//const db = require("./models");
const http = require("http");
const path = require("path");
const controllers = require("./controllers");
dotenv.config();

const app = express();
const server = http.createServer(app);
const { HTTP_PORT = 8080 } = process.env;

app.use("/api/trips/v1", controllers.trips);

function start() {
    return new Promise((resolve, reject) => {
        server.listen(HTTP_PORT, async(err) => {
            if (err) return reject(err);
            console.log(`server listener running: http://localhost:${HTTP_PORT}`);
            //await db.init();
            resolve();
        });
    });
}

function close() {
    server.close();
}

module.exports = { start, close, app };