const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const getFavoritesNoticesByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const result = await Notice.find({ favorites: userId });

        if (!result) {
            throw new NotFound('Not found');
        }

        res.status(200).json({
            status: 'success',
            code: 200,
            data: { result },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getFavoritesNoticesByUser;
