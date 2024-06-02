const { verify, sign } = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const getToken = (userid) => {
  const token = sign({ userid }, secret);
  return token;
};

const getUserId = (token) => {
  try {
    const decoded = verify(token, secret);
    if (decoded) {
      return decoded.userid;
    }
    return null;
  } catch (error) {
      console.log(error);
      return null;
  }
};

module.exports = {
  getToken,
  getUserId,
};
