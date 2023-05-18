const Joi = require('joi');

const addNoticeSchema = Joi.object({
    title: Joi.string(),
    price: Joi.string().min(1).messages({
        'number.min': 'Price must be higher than 0',
    }),
    name: Joi.string().required().min(2).max(16).messages({
        'any.required': 'Set name for notice',
    }),
    birthday: Joi.date().max('now').required().messages({
        'any.required': 'Set birthday for notice',
    }),
    breed: Joi.string().required().min(2).max(16).messages({
        'any.required': 'Set breed for notice',
    }),
    place: Joi.string().required().messages({
        'any.required': 'Set place for notice',
    }),
    sex: Joi.string().valid('male', 'female').required().messages({
        'any.required': 'Set sex for notice',
        'any.only': 'Sex is invalid',
    }),
    comments: Joi.string().min(8).max(120),
    photoURL: Joi.binary()
        .max(3 * 1024 * 1024)
        .description('PetImage max 3mb'),
    photoPublicId: Joi.string(),
});

module.exports = addNoticeSchema;
