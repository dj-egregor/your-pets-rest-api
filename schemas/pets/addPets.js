const Joi = require('joi');

const addPetSchema = Joi.object({
    name: Joi.string().min(2).max(16).messages({
        'any.required': 'Missing required name field',
    }),

    photoURL: Joi.binary()
        .max(3 * 1024 * 1024)
        .description('PetImage max 3mb'),

    birthday: Joi.date().max('now').required(),

    breed: Joi.string().min(2).max(16).description('Pet breed'),

    comments: Joi.string().min(8).max(120).description('Comments to pet'),
});

module.exports = addPetSchema;