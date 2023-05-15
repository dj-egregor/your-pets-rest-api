const { NotFound } = require('http-errors');
const News = require('../../models/news');

const getNewsByTitle = async (req, res, next) => {
    try {
        const { page = 1, limit = 6, q } = req.query;
        const skip = (page - 1) * limit;

        const searchWords = q.trim().split(' ');
        const regex = new RegExp(searchWords, 'i');

        const total = await News.countDocuments({ title: regex });

        const news = await News.find({ title: regex }).skip(skip).limit(limit);

        if (!news) {
            throw new NotFound(`There are no news`);
        }

        const totalPages = Math.ceil(total / limit);

        res.json({
            news,
            total,
            totalPages,
            currentPage: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getNewsByTitle;
