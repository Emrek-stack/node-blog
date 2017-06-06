var Client = require('node-rest-client').Client;
var client = new Client();
var Immutable = require('immutable');
var moment = require('moment');
var mongo = require('mongodb');
var multer = require('multer');

var db = require('../helper/db');
var item = require('../model/item');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var uploadFile = multer({
    storage: storage
}).single('userPhoto');

var converter = require('../helper/converter');
var config = require('../config.json');

module.exports = {

    list: function(req, res) {

        // converter.download('https://www.google.com/images/srpr/logo3w.png', config.imagePath + 'google.png', function(filename) {
        //     console.log(filename);
        // });


        var collection = db.get().collection('items')

        var isConfimed = converter.stringToBoolean(req.query.IsConfirmed) ? [true] : [true, false];
        var statusId = converter.stringToBoolean(req.query.StatusId) ? [true] : [true, false];
        var allowBack = converter.stringToBoolean(req.query.AllowBack) ? [true] : [true, false];
        var isFavorite = converter.stringToBoolean(req.query.IsFavorite) ? [true] : [true, false];
        var isTrans = converter.stringToBoolean(req.query.IsTrans) ? [true] : [false, false];

        collection.find({
            AllowBack: {
                $in: allowBack
            },
            IsConfirmed: {
                $in: isConfimed
            },
            StatusId: {
                $in: statusId
            },
            IsFavorite: {
                $in: isFavorite
            },
            IsTrans: {
                $in: isTrans
            }
        }).toArray(function(err, docs) {

            docs.forEach(function(item, index) {
                if (item.LastCallDate) {
                    var day = item.LastCallDate.getDate();
                    var monthIndex = item.LastCallDate.getMonth();
                    var year = item.LastCallDate.getFullYear();

                    var days = day + '.' + monthIndex + '.' + year + ' ' + item.LastCallDate.getHours() + ':' + item.LastCallDate.getMinutes();
                    item.LastCallDate = days;
                }
            })
            res.json(docs)
        });
    },

    create: function(req, res) {
        var gsm = req.body.Gsm.trim();
        gsm = converter.clearGsm(gsm);
        var collection = db.get().collection('items');

        req.body._id = null;

        var newItem = new item({
            Title: req.body.Title,
            Url: req.body.Url,
            Gsm: gsm,
            Location: req.body.Location,
            AllowBack: req.body.AllowBack,
            CallCount: 0,
            LastCallDate: null,
            CreateDate: new Date(),
            Price: req.body.Price,
            StatusId: 1,
            IsConfirmed: false,
            IsFavorite: false,
            IsTrans: false
        });


        item.findOne({
            'Gsm': newItem.Gsm
        }, (err, ss) => {
            if (!ss) {
                newItem.save(function(err) {
                    if (err) throw err;
                    console.log('User saved successfully!');
                    res.json(newItem);
                });
            }
            res.json(ss);
        });
    },

    getById: function(req, res) {
        item.findOne({
            '_id': req.query.id
        }, function(err, item) {
            res.json(item);
        });
    },

    update: function(req, res) {

        item.findOneAndUpdate({
            "_id": req.body._id
        }, {
            "$set": {
                "Title": req.body.Title,
                "Url": req.body.Url,
                "Gsm": req.body.Gsm,
                "Location": req.body.Location,
                "AllowBack": req.body.AllowBack,
                "Price": req.body.Price,
                "IsTrans": req.body.IsTrans,
                "IsConfirmed": req.body.IsConfirmed,
                "IsFavorite": req.body.IsFavorite,
                "StatusId": req.body.StatusId
            },

        }).exec(function(err, book) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.json(status = "success");
            }
        });
    },

    upload: function(req, res) {
        uploadFile(req, res, function(err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    },

    updateCallInfo: (req, res) => {

        console.log(req.q);

        item.findOneAndUpdate({
            "_id": req.query.itemId
        }, {
            "$set": {
                "CallCount": parseInt(req.query.callCount) + 1,
                "LastCallDate": new Date()
            }
        }).exec(function(err, book) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.json(status = "success");
            }
        });
    }
}