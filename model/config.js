// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var configSchema = new Schema({
    Application: {
        type: Schema.Types.ObjectId,
        ref: 'Application'
    },
    Key: {
        type: String,
        required: true,
    },
    Value: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    StatusId: {
        type: Boolean,
        required: true
    }
});

var Config = mongoose.model('config', configSchema);

module.exports = Config;