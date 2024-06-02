const {
  throwBadRequestError,
  throwUnauthorizedError,
} = require("../error/custom-Error");
const Url = require("../models/url");
const User = require("../models/user");

const makeShortUrl = async (req, res) => {
  if (!req.userId) {
    throwUnauthorizedError("You are not logged in");
  }
  const { completeUrl, shortUrl } = req.body;
  if (!/^[a-z0-9-]+$/i.test(shortUrl)) {
    throwBadRequestError("Short URL is not valid");
  }
  const url = await Url.findOne({ shortURL:shortUrl });
  if (url) {
    throwBadRequestError("Short URL already exists");
  }
  const newUrl = await Url.create({
    completeURL: completeUrl,
    shortURL: shortUrl,
    createdBy: req.userId,
  });
  await User.findByIdAndUpdate(req.userId, {
    $push: {
      urls: newUrl._id,
    },
  });
  res.status(201).json({
    message: "URL created successfully",
    data: newUrl,
    link: `${process.env.BASE_URL}/${shortUrl}`,
  });
};

module.exports = makeShortUrl;
