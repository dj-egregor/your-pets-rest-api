const { Schema, model } = require('mongoose');

const petSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        photoURL: {
            type: String,
        },
        birthdate: {
            type: Date,
            required: true,
        },
        breed: {
            type: String,
        },
        comments: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { versionKey: false }
);

const Pet = model('pet', petSchema);

module.exports = Pet;
