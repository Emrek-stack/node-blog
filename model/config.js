// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var configSchema = new Schema({
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Url: {
        type: String,
        required: true,
    },
    CreateDate: Date,
    Price: Number,
    StatusId: {
        type: Boolean,
        required: true
    }
});

var Config  = mongoose.model('config', configSchema);

module.exports = Config;