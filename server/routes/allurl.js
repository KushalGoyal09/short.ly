const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const getAllurls = require('../controllers/giveAllUrl');

router.get('/', auth,getAllurls);

module.exports = router;