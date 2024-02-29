const express = require('express');
const device = require('express-device');
const connect = require('./db/connect');
const notFound = require('./middleware/not-Found');
const errorHandler = require('./middleware/error-Handler');
const app = express();
require('express-async-errors');
require('dotenv').config();
const port = process.env.PORT || 8000;

app.use(device.capture());

app.get('/', (req, res) => {
    res.redirect(process.env.CLIENT_URL);
});

app.get('/:shortUrl', require('./routes/url'));

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connect(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log('Server is listening on port ' + port);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
