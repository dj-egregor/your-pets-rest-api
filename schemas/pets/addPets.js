const Joi = require('joi');

const addPetSchema = Joi.object({
    name: Joi.string().min(2).max(16).required().messages({
        'any.required': 'Set name for pet',
    }),

    photoURL: Joi.binary()
        .max(3 * 1024 * 1024)
        .description('PetImage max 3mb'),

    birthday: Joi.date().max('now').required().messages({
        'any.required': 'Set birthday for pet',
    }),

    breed: Joi.string()
        .min(2)
        .max(16)
        .required()
        .description('Pet breed')
        .messages({
            'any.required': 'Set breed for pet',
        }),

    comments: Joi.string()
        .min(8)
        .max(120)
        .required()
        .description('Comments for pet').messages({
        'any.required': 'Set comment for pet',
    }),
});

module.exports = addPetSchema;