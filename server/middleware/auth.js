const {
  throwBadRequestError,
  throwUnauthorizedError,
} = require("../error/custom-Error");
const { getUserId } = require("../service/auth");

const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throwBadRequestError("Access denied. No token provided or invalid format.");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throwBadRequestError("Access denied. No token provided or invalid format.");
  }
  const userId = getUserId(token);
  if (!userId) {
    throwUnauthorizedError("You are not logged in");
  }
  req.userId = userId;
  next();
};

module.exports = auth;
