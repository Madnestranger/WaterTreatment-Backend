var express = require('express');
var router = express.Router();
var db = require('../db');
var ObjectId = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.query.id) {
        db.get().collection('diseases').findOne({_id: ObjectId(req.query.id)}, function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(docs);
        })
    } else {
        db.get().collection('diseases').find().toArray(function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(docs);
        })
    }
});

module.exports = router;
