const User = require("../models/user");

const userInfo = async(req,res) => {
    const userId = req.userId;
    const user = await User.findById(userId);
    res.json({
        success: true,
        userAuth:true,
        user
    })
}
module.exports = userInfo;