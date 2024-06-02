const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    completeURL: {
        type: String,
        required: [true, 'URL is required'],
        trim: true,
        validate: {
            validator: function (value) {
                return /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/.test(value);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    shortURL: {
        type: String,
        required: [true, 'Short URL is required'],
        trim: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[a-z0-9-]+$/i.test(value);
            },
            message: props => `${props.value} is not a valid short URL!`
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    clicks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clicks'
    }]
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;