// var fs = require('fs');

var glob = require('glob');

function registerRoutes(app) {
    glob('./routes/**/*.js', function (err, files) {
        console.log(files);
    });
}

module.exports = registerRoutes;