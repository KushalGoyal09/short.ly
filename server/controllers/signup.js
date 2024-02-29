const {v4: uuidv4} = require('uuid');
const { throwCustomError } = require('../error/custom-Error');
const User = require('../models/user');
const { setUserSession } = require('../service/auth');

const handleSignup = async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        throwCustomError('Name, email and password are required', 400);
    }
    const user = await User.create({ name, email, password });
    const token = uuidv4();
    setUserSession(user._id, token);
    res.status(200).json({
        success: true,
        message: 'User created successfully',
        token
    })
}

module.exports = handleSignup;