// var express = require('express');
// var router = express.Router();

var config = require('../../config.json');

module.exports = {
    login: function(req, res) {
        if (req.body.user == config.user.user && req.body.pass == config.user.pass) {

            res.redirect('/');
            req.session.isLogged = true;
        }

        res.redirect('/login');
    }
}