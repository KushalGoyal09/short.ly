const mongoose = require('mongoose');

const connect = async (uri) => {
    await mongoose.connect(uri);
};

module.exports = connect;
