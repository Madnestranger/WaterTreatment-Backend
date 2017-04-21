var express = require('express');
var router = express.Router();
var db = require('../db');
var ObjectId = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
    db.get().collection('users').findOne({login: req.query.login}, function (err, docs) {
        if (err || docs == null) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (docs.password != req.query.password) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
});

module.exports = router;
