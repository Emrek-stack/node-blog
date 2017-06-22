const mongoose = require('mongoose');
const Article = require('../../model/article');

module.exports = {
    createGet: (req, res) => {
        res.render('admin/blog/create', {
            title: 'aa',
            layout: 'blogLayout.hbs'
        });
    },

    createPost: (req, res) => {
        var post = new Article({
            title: "My first post",
            author: "Yash Kumar",
            body: "We want to make documentation obsolete"
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

            res.send(userMap);
        });


    }
}