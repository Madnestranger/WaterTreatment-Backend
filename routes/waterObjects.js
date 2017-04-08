var express = require('express');
var router = express.Router();
var db = require('../db');
var ObjectId = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.query.id) {
        db.get().collection('waterObjects').findOne({_id: ObjectId(req.query.id)}, function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(docs);
        })
    } else {
        db.get().collection('waterObjects').find().toArray(function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(docs);
        })
    }
});

router.post('/', function (req, res) {
    var object = {
        name: req.body.name,
        lat: req.body.lat,
        lng: req.body.lng,
        desc: req.body.desc,
        images: req.body.images
    };
    db.get().collection('waterObjects').insert(object, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(object);
    });
});

module.exports = router;
