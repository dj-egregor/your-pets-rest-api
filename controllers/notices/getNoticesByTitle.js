const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const getNoticesByTitle = async (req, res, next) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 12, q } = req.query;
        const skip = (page - 1) * limit;

        const searchWords = q.trim().split(' ');
        const regex = new RegExp(searchWords, 'i');

        const result = await Notice.find({
            $and: [{ category }, { title: regex }],
        })
            .skip(skip)
            .limit(limit);

        if (result.length === 0) {
            throw new NotFound(`There are no notices for this request`);
        }

        res.status(201).json({
            result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getNoticesByTitle;
