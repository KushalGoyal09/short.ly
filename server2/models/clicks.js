const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    url: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Url'
    },
    time: {
        type: Date,
        default: Date.now,
    },
    ipAddress: {
        type: String,
    },
    device: {
        type: String,
    }
});

const Click = mongoose.model('Click', clickSchema);

module.exports = Click;