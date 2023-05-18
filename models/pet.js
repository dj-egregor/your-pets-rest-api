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
        photoPublicId: {
            type: String,
        },
        birthday: {
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
    {
        versionKey: false,
        timestamps: true,
    }
);

const Pet = model('pet', petSchema);

module.exports = Pet;
