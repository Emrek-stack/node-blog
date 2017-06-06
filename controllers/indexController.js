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

}