const User = require("../models/user");

const getAllurls = async (req,res) => {
    const userId = req.userId;
    if(!userId) {
        throwUnauthorizedError('You are not logged in');
    }
    const user = await User.findById(userId);
    const userUrls = await user.populate('urls');
    res.status(200).json({
        success:true,
        userUrls: userUrls.urls,
        baseUrl: process.env.BASE_URL
    })
}

module.exports = getAllurls;