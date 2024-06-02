const express = require('express');
const router = express.Router();
const showAnalytics = require('../controllers/showAnalytics');
const auth = require('../middleware/auth');

router.post('/', auth,showAnalytics);

module.exports = router;