const { throwUnauthorizedError, throwBadRequestError } = require("../error/custom-Error");
const Click = require("../models/clicks");
const Url = require("../models/url");
const User = require("../models/user");

const showAnalytics = async (req, res) => {
    const userId = req.userId;
    if(!userId) {
        throwUnauthorizedError('You are not logged in');
    }
    const user = await User.findById(userId);
    if(!user) {
        throwUnauthorizedError('You are not logged in');
    }
    const { urlID } = req.body;
    const urls = user.urls;
    const urlExists = urls.find(url => url._id.toString() === urlID);
    if(!urlExists) {
        throwBadRequestError('URL does not exist');
    }
    const url = await Url.findById(urlID);
    const clickIds = url.clicks;
    const clicksCount = clickIds.length;
    let allClicks = [];
    if(clickIds) {
        allClicks = await Click.find({ _id: { $in: clickIds } });
    }
    res.status(200).json({
        url,
        clicksCount,
        allClicks
    })
}

module.exports = showAnalytics;