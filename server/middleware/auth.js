const { throwBadRequestError, throwUnauthorizedError } = require("../error/custom-Error");
const { getUserSession } = require("../service/auth");

const auth = async (req, res, next) => {
    const sessionId = req.headers.authorization;
    if(!sessionId) {
        throwBadRequestError('Session ID is required');
    }
    const userId = getUserSession(sessionId);
    if(!userId) {
        throwUnauthorizedError('You are not logged in');
    }
    req.userId = userId;
    next();
};

module.exports = auth;