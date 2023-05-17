const { isValidObjectId } = require('mongoose');

const { BadRequest } = require('http-errors');

const isValidId = fieldId => (req, res, next) => {
    const { [fieldId]: id } = req.params;
    const isIdValid = isValidObjectId(id);
    if (!isIdValid) {
        return next(BadRequest(`${id} is not valid id`));
    }
    next();
};

module.exports = isValidId;
