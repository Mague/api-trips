const { Router } = require("express");
const api = Router();

api.get("/", function(req, res) {
    res.send("Hola");
});
module.exports = api;