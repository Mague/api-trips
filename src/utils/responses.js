module.exports.JSON = function(err, doc, res) {
    if (err) {
        res.json({
            err: err,
        });
    } else {
        res.json(doc);
    }
};
module.exports.BJSON = function(err, doc, res) {
    if (err) {
        res.json({
            err: err,
        });
    } else {
        res.json(doc);
    }
};
module.exports.SEND = function(err, doc, res) {
    if (err) {
        res.send({ err: err });
    } else {
        res.send({ data: doc });
    }
};