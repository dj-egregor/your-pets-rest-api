const Joi = require('joi');

const updateStatusNoticeSchema = Joi.object({
    favorite: Joi.bool().required(),
}).messages({
    'any.required': 'missing field favorite',
});

module.exports = updateStatusNoticeSchema;
