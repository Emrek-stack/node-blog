// var Client = require('node-rest-client').Client;
// var client = new Client();
//var Immutable = require('immutable');
//var moment = require('moment');
//var mongo = require('mongodb');
//var multer = require('multer');
//var { wrap: async } = require('co');

module.exports = {
    index: (req, res)=> 
    {
       res.render('web/index', {title:'aa'});
    }
}