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
        birthday: {
            type: Date,
        },
        phone: {
            type: String,
        },
        city: {
            type: String,
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
        },
        photoPublicId: {
            type: String,
        },
        favorite: [
            {
                type: Schema.Types.ObjectId,
                ref: 'notice',
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = { User };
