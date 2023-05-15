const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const getUserNotices = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { page = 1, limit = 12 } = req.query;
        const skip = (page - 1) * limit;

        const [total, notices] = await Promise.all([
            Notice.countDocuments({ owner }),
            Notice.find({ owner })
                .populate('owner', 'name email phone')
                .skip(skip)
                .limit(limit),
        ]);

        if (!notices) {
            throw new NotFound('Not found');
        }

        const totalPages = Math.ceil(total / limit);
        res.json({
            notices,
            total,
            totalPages,
            currentPage: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserNotices;
