const express = require('express');
const connect = require('./db/connect');
const notFound = require('./middleware/not-Found');
const errorHandler = require('./middleware/error-Handler');
require('express-async-errors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/url', require('./routes/url'));
app.use('/analytics', require('./routes/analytics'))

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
