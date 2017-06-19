// var Client = require('node-rest-client').Client;
// var client = new Client();
//var Immutable = require('immutable');
//var moment = require('moment');
//var mongo = require('mongodb');
//var multer = require('multer');
//var { wrap: async } = require('co');
//const mongoose = require('mongoose');
//const Article = mongoose.model('Article');

module.exports = {
    index: function (req, res)  {
        // const page = (req.query.page > 0 ? req.query.page : 1) - 1;
        // const _id = req.query.item;
        // const limit = 30;
        // const options = {
        //     limit: limit,
        //     page: page
        // };

        // if (_id) options.criteria = {
        //     _id
        // };

        // const articles = yield Article.list(options);
        // const count = yield Article.count();

        // respond(res, 'articles/index', {
        //     title: 'Articles',
        //     articles: articles,
        //     page: page + 1,
        //     pages: Math.ceil(count / limit)
        // });
      res.render('web/home/index', {title: 'aa', layout: 'blogLayout.hbs' });
    }
}