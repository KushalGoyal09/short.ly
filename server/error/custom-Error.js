class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const throwCustomError = (message, statusCode) => {
    throw new CustomError(message, statusCode);
};

const throwBadRequestError = (message) => {
    throw new CustomError(message, 400);
};

const throwNotFoundError = (message) => {
    throw new CustomError(message, 404);
};

const throwUnauthorizedError = (message) => {
    throw new CustomError(message, 401);
};

module.exports = {
    CustomError,
    throwCustomError,
    throwBadRequestError,
    throwNotFoundError,
    throwUnauthorizedError
};
