const { NotFound } = require('http-errors');
const News = require('../../models/news');

const getNews = async (req, res, next) => {
    try {
        const { page = 1, limit = 6 } = req.query;
        const skip = (page - 1) * limit;

        const result = await News.find().skip(skip).limit(limit);

        if (!result) {
            throw new NotFound(`There are no news`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = getNews;
