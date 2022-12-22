const mongoose = require('mongoose');

const { Schema } = mongoose;

const linksSchema = new Schema({
    shortLink: {
        type: String,
        required: true,
        unique: true
    },
    longLink: {
        type: String,
        required: true
    },
    hitCount: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('links', linksSchema);