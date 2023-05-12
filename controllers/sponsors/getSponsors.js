const { NotFound } = require('http-errors');
const Sponsor = require('../../models/sponsor');

const getSponsors = async (req, res, next) => {
    try {
        const { page = 1, limit = 6 } = req.query;
        const skip = (page - 1) * limit;

        const result = await Sponsor.find().skip(skip).limit(limit);

        if (!result) {
            throw new NotFound(`There are no sponsors`);
        }
        res.status(200).json({
            status: 'success',
            code: 200,
            data: { result },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getSponsors;
