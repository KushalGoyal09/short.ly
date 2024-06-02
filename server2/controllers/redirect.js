const Url = require('../models/url');
const Click = require('../models/clicks');
require('dotenv').config();

const redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortURL: shortUrl });
    if(!url) {
        return res.status(404).redirect(process.env.CLIENT_URL);
    }
    const click = await Click.create({
        url: url._id,
        ipAddress: req.ip,
        device: req.device.type
    });
    await Url.findByIdAndUpdate(url._id, {
        $push: {
            clicks: click._id
        }
    });
    res.redirect(url.completeURL);
}

module.exports = redirectUrl;