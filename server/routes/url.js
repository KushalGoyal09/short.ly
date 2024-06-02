const express = require('express');
const router = express.Router();
const makeShortUrl = require('../controllers/makeShortUrl');
const auth = require('../middleware/auth');

router.post('/', auth, makeShortUrl);

module.exports = router;