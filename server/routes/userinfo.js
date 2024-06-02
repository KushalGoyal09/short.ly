const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userInfo = require('../controllers/userinfo');

router.get('/', auth, userInfo);

module.exports = router;