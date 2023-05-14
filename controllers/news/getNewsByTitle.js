const { NotFound } = require('http-errors');
const News = require('../../models/news');

const getNewsByTitle = async (req, res, next) => {
    try {
        const { page = 1, limit = 6, q } = req.query;
        const skip = (page - 1) * limit;

        const searchWords = q.trim().split(' ');
        const regex = new RegExp(searchWords, 'i');

        const result = await News.find({ title: regex })
            .skip(skip)
            .limit(limit);

        if (!result) {
            throw new NotFound(`There are no news`);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = getNewsByTitle;
