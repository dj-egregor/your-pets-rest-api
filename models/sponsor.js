const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers/');

const sponsorSchema = new Schema(
    {
        title: {
            type: String,
        },
        url: {
            type: String,
        },
        addressUrl: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        address: {
            type: String,
        },
        workDays: {
            type: [Schema.Types.Mixed],
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

sponsorSchema.post('save', handleMongooseError);

const Sponsor = model('sponsor', sponsorSchema);

module.exports = Sponsor;
