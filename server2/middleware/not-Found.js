const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: 'The requested resource could not be found',
        statusCode: 404
    });
};

module.exports = notFound;
