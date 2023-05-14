const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const getUserNotices = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { page = 1, limit = 12 } = req.query;
        const skip = (page - 1) * limit;

        const result = await Notice.find({ owner })
            .populate('owner', 'name email phone')
            .skip(skip)
            .limit(limit);

        if (!result) {
            throw new NotFound('Not found');
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = getUserNotices;
