const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers/');

const emailRegexp = require('../utils/regexp/emailRegexp');

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        name: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: emailRegexp,
            unique: true,
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
        },
        favorite: {
            type: Schema.Types.ObjectId,
            ref: 'notice',
        },
    },
    { versionKey: false }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = { User };
