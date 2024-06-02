const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    completeURL: {
        type: String,
        required: [true, 'URL is required'],
        trim: true,
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
    }],
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;