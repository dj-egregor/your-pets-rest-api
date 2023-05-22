const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const getNoticesByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 12 } = req.query;
        const skip = (page - 1) * limit;

        const [total, notices] = await Promise.all([
            Notice.countDocuments({ category }),
            Notice.find({ category }).skip(skip).limit(limit),
        ]);

        if (notices.length <= 0) {
            throw new NotFound(`There are no notices for this requestWWWWWWWW`);
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

module.exports = getNoticesByCategory;
