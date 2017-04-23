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
            db.get().collection('diseases').find().toArray(function (errDis, docsDis) {
                docs.diseaseObject = [];
                docs.diseases.forEach(function (disease) {
                    docs.diseaseObject.push(docsDis.find(function (x) {
                        return x._id == disease;
                    }));
                });
                res.send(docs);
            });
        })
    } else {
        db.get().collection('waterObjects').find().toArray(function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            db.get().collection('diseases').find().toArray(function (errDis, docsDis) {
                docs.forEach(function (object, key) {
                    if (!docs[key].diseaseObject) {
                        docs[key].diseaseObject = [];
                    }
                    object.diseases.forEach(function (disease) {
                        object.diseaseObject.push(docsDis.find(function (x) {
                           return x._id == disease;
                        }));
                    });
                    if (key == docs.length - 1 ) {
                        res.send(docs);
                    }
                });
            });
        })
    }
});

router.post('/', function (req, res) {
    var object = {
        name: req.body.name,
        lat: req.body.lat,
        lng: req.body.lng,
        desc: req.body.desc,
        images: req.body.images,
        cityId: req.body.cityId,
        diseases: req.body.diseases,
        existTreatAgency: req.body.existTreatAgency
    };
    if (req.body.id) {
        db.get().collection('waterObjects').updateOne(
            { _id: ObjectId(req.body.id)},
            { $set: {
                name: req.body.name,
                lat: req.body.lat,
                lng: req.body.lng,
                desc: req.body.desc,
                images: req.body.images,
                cityId: req.body.cityId,
                diseases: req.body.diseases,
                existTreatAgency: req.body.existTreatAgency
            }
            });
        res.send(object);
    } else {
        db.get().collection('waterObjects').insert(object, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(object);
        });
    }
});

module.exports = router;
