const {v4: uuidv4} = require('uuid');
const { throwCustomError, throwNotFoundError, throwUnauthorizedError } = require('../error/custom-Error');
const User = require('../models/user');
const { setUserSession } = require('../service/auth');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throwNotFoundError('User not found');
    }
    if(user.password !== password){
        throwUnauthorizedError('Invalid password');
    }
    const token = uuidv4();
    setUserSession(user._id, token);
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token
    })
}

module.exports = handleLogin;