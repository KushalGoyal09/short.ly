const { throwUnauthorizedError, throwBadRequestError } = require("../error/custom-Error");
const Click = require("../models/clicks");
const Url = require("../models/url");

const showAnalytics = async (req, res) => {
    const userId = req.userId;
    if(!userId) {
        throwUnauthorizedError('You are not logged in');
    }
    const { shortUrl } = req.body;
    const url = await Url.findOne({shortURL:shortUrl});
    if(url.createdBy !== userId) {
        throwBadRequestError("The short url does not belong to you")
    }
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