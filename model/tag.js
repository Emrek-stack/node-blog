'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getTags = tags => tags.join(',');
const setTags = tags => tags.split(',');

/**
 * Article Schema
 */

var TagSchema = new Schema({
    tag: {
        type: String,
        required: true,
        trim: true
    },
    count: {
        type: Number
    }
});



/**
 * Methods
 */

TagSchema.methods = {

    removeComment: function (commentId) {
        const index = this.comments
            .map(comment => comment.id)
            .indexOf(commentId);

        if (~index) this.comments.splice(index, 1);
        else throw new Error('Comment not found');
        return this.save();
    },
};

/**
 * Statics
 */

TagSchema.statics = {

    list: function (options) {
        const criteria = options.criteria || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        return this.find(criteria)
            .populate('user', 'name username')
            .sort({
                createdAt: -1
            })
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
};


var Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;