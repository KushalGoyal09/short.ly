const { throwCustomError } = require('../error/custom-Error');
const User = require('../models/user');
const { getToken } = require('../service/auth');

const handleSignup = async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        throwCustomError('Name, email and password are required', 400);
    }
    const user = await User.create({ name, email, password });
    const token = getToken(String(user._id));
    res.status(200).json({
        success: true,
        message: 'User created successfully',
        token
    })
}

module.exports = handleSignup;