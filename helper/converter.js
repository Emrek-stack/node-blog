var fs = require('fs');
var request = require('request');
var uuid = require('node-uuid');
var url = require("url");
var path = require("path");

exports.stringToBoolean = function(string) {
    switch (string.toLowerCase().trim()) {
        case "true":
        case "yes":
        case "1":
            return true;
        case "false":
        case "no":
        case "0":
        case null:
            return false;
        default:
            return Boolean(string);
    }
}

exports.clearGsm = function(gsm) {
    gsm = gsm.split(" ");
    var newgsm = "";

    gsm.forEach(function(item, index) {
        newgsm += item;
    });
    return newgsm;
}


exports.download = function(uri, filename, callback) {

    var url = require("url");
    var path = require("path");
    var parsed = url.parse(uri);
    filename = path.basename(parsed.pathname);

    request.head(uri, function(err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback(filename));
    });
};