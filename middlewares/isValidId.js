const { isValidObjectId } = require('mongoose');

const { NotFound } = require('http-errors');

const isValidId = (req, res, next) => {
    const { petId } = req.params;
    const isCorrectId = isValidObjectId(petId);
    if (!isCorrectId) {
        next(NotFound('Not found'));
    }
    next();
};

module.exports = isValidId;
