const Joi = require('joi');

const emailRegexp = require('../../utils/regexp/emailRegexp');

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string()
        .min(6)
        .max(16)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
        .required()
        .messages({
            'string.pattern.base':
                'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
        }),
});

module.exports = loginSchema;
