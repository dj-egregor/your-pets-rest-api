const { NotFound } = require('http-errors');
const News = require('../../models/news');

const getNews = async (req, res, next) => {
    try {
        const { page = 1, limit = 6 } = req.query;
        const skip = (page - 1) * limit;

        const [total, news] = await Promise.all([
            News.countDocuments(),
            News.find().skip(skip).limit(limit),
        ]);

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

module.exports = getNews;
