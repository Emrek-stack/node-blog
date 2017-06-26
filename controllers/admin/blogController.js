const mongoose = require('mongoose');
const Article = require('../../model/article');
const Application = require('../../model/application');
const Config = require('../../model/config');

module.exports = {
    createGet: (req, res) => {
        console.log(req.root);
        res.render('admin/blog/create', {
            title: 'aa',
            root : req.root,
            layout: 'blogLayout.hbs'
        });
    },

    createPost: (req, res) => {
        var app = new Application();

        var post = new Config({
            Application : app,
            Key : 'Test',
            Value : 'Test',
            Description: 'Test',
            statusId : true
        });

        post.save(function (err) {
            if (!err)
                res.send(post);
        });
    },

    list: (req, res) => {

        Article.find({}, function (err, users) {
            var userMap = {};

            users.forEach(function (user) {
                userMap[user._id] = user;
            });
            res.render('admin/blog/list', {
                model: userMap,
                layout: 'blogLayout.hbs'
            });
        });


    }
}