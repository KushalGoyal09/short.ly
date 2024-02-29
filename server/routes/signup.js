const express = require('express');
const router = express.Router();
const handleSignup = require('../controllers/signup');

router.post('/', handleSignup);

module.exports = router;