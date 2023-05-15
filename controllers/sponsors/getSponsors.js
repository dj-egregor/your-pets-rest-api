const { NotFound } = require('http-errors');
const Sponsor = require('../../models/sponsor');

const getSponsors = async (req, res, next) => {
    try {
        const { page = 1, limit = 9 } = req.query;
        const skip = (page - 1) * limit;

        const result = await Sponsor.find().skip(skip).limit(limit);

        if (!result) {
            throw new NotFound(`There are no sponsors`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = getSponsors;
