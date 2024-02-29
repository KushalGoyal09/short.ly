const express = require('express');
const redirectUrl = require('../controllers/redirect');
const router = express.Router();

router.get('/:shortUrl', redirectUrl);

module.exports = router;