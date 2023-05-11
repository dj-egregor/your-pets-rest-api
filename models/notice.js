const { Schema, model } = require('mongoose');

const noticeSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Set title for notice'],
        },
        category: {
            type: String,
            enum: ['sell', 'in good hands', 'lost/found'],
            required: [true, 'Set category for notice'],
        },
        name: {
            type: String,
            required: [true, 'Set name for pet'],
        },
        birthday: {
            type: Date,
            required: true,
        },
        breed: {
            type: String,
        },
        place: {
            type: String,
        },
        sex: {
            type: String,
            enum: ['male', 'female'],
        },
        comments: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
);

const Notice = model('notice', noticeSchema);

module.exports = Notice;
