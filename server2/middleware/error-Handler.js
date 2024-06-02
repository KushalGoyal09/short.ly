const { CustomError } = require("../error/custom-Error");

const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomError) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
            statusCode: err.statusCode || 500
        }); 
    }
    res.status(500).json({
        success: false,
        error: err,
        statusCode: 500
    });
};

module.exports = errorHandler;
