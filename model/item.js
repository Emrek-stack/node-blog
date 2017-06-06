// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var itemSchema = new Schema({
    Title: {
        type: String,
        required: true,
    },
    Url: {
        type: String,
        required: true,
    },
    Gsm: {
        type: String,
        required: true,
        unique: true
    },
    Location: String,
    AllowBack: {
        type: Boolean,
        required: true
    },
    CallCount: Number,
    LastCallDate: Date,
    CreateDate: Date,
    Price: Number,
    StatusId: {
        type: Boolean,
        required: true
    },
    IsConfirmed: {
        type: Boolean,
        required: true
    },
    IsFavorite: {
        type: Boolean,
        required: true
    },
    IsTrans: {
        type: Boolean,
        required: true
    }
});

// the schema is useless so far
// we need to create a model using it
var Item = mongoose.model('items', itemSchema);

// make this available to our users in our Node applications
module.exports = Item;