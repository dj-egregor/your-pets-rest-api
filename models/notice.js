const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers/');

const noticeSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Set title for notice'],
        },
        category: {
            type: String,
            enum: ['sell', 'in-good-hands', 'lost-found'],
            required: [true, 'Set category for notice'],
        },
        price: {
            type: String,
            min: [1, 'Price must be higher than 0'],
            required: function () {
                return this.category === 'sell';
            },
        },
        name: {
            type: String,
            minLength: 2,
            maxLength: 16,
            required: [true, 'Set name for notice'],
        },
        birthday: {
            type: Date,
            required: [true, 'Set birthday for notice'],
        },
        breed: {
            type: String,
            minLength: 2,
            maxLength: 16,
            required: [true, 'Set breed for notice'],
        },
        place: {
            type: String,
            required: [true, 'Set place for notice'],
        },
        sex: {
            type: String,
            enum: ['male', 'female'],
            required: [true, 'Set sex for notice'],
        },
        comments: {
            type: String,
            minLength: 8,
            maxLength: 120,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        photoURL: {
            type: String,
            default: null,
        },
        photoPublicId: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

noticeSchema.post('save', handleMongooseError);

const Notice = model('notice', noticeSchema);

module.exports = Notice;
