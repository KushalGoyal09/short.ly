const { throwCustomError, throwNotFoundError, throwUnauthorizedError } = require('../error/custom-Error');
const User = require('../models/user');
const { getToken } = require('../service/auth');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throwNotFoundError('User not found');
    }
    if(user.password !== password){
        throwUnauthorizedError('Invalid password');
    }
    const token = getToken(String(user._id));
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token
    })
}

module.exports = handleLogin;