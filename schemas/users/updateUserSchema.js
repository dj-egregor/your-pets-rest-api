const Joi = require('joi');

const updateUserSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(16)
        .pattern(/^[a-zA-Zа-яА-Я' -]+$/)
        .trim(),

    email: Joi.string().email(),

    photoPublicId: Joi.string(),

    birthday: Joi.date().max('now').iso(),

    phone: Joi.string().regex(/^[\d+() -]+$/),

    city: Joi.string()
        .min(2)
        .max(100)
        .pattern(/^[a-zA-Zа-яА-Я]+(?:[\s-][a-zA-Zа-яА-Я]+)*$/)
        .trim(),
})
    .min(1)
    .options({
        messages: {
            'object.min': 'missing fields',
        },
    });

module.exports = updateUserSchema;