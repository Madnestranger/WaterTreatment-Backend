var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res, next) {
    request({
        uri: "http://polygons.openstreetmap.fr/get_geojson.py?",
        method: "GET",
        qs: {
            id: req.query.id
        }
    }, function(error, response, body) {
        res.send(body);
    });
});


module.exports = router;
