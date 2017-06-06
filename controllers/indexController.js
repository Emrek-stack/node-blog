var Client = require('node-rest-client').Client;
var client = new Client();
var Immutable = require('immutable');
var moment = require('moment');
var mongo = require('mongodb');
var multer = require('multer');
var { wrap: async } = require('co');



var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var uploadFile = multer({
    storage: storage
}).single('userPhoto');

var converter = require('../helper/converter');
var config = require('../config.json');

module.exports = {
    index: async(function* (req, res) {
        const page = (req.query.page > 0 ? req.query.page : 1) - 1;
        const _id = req.query.item;
        const limit = 30;
        const options = {
            limit: limit,
            page: page
        };

        if (_id) options.criteria = {
            _id
        };

        const articles = yield Article.list(options);
        const count = yield Article.count();

        respond(res, 'index', {
            title: 'Articles',
            articles: articles,
            page: page + 1,
            pages: Math.ceil(count / limit)
        });
    })
}