const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const getNoticesByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 12 } = req.query;
        const skip = (page - 1) * limit;

        const result = await Notice.find({ category }).skip(skip).limit(limit);

        if (!result) {
            throw new NotFound(`There are no notices for this request`);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = getNoticesByCategory;
