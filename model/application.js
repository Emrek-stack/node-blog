'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    statusId: {
        type: Boolean,
        required: true
    }
});


/**
 * Statics
 */

ApplicationSchema.statics = {

    /**
     * Find article by id
     *
     * @param {ObjectId} id
     * @api private
     */

    load: function (_id) {
        return this.findOne({
            _id
        })
            .populate('user', 'name email username')
            .populate('comments.user')
            .exec();
    },

    /**
     * List articles
     *
     * @param {Object} options
     * @api private
     */

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


var Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;