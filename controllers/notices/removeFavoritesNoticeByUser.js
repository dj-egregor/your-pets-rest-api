const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const removeFavoritesNoticeByUser = async (req, res, next) => {
    try {
        const { noticeId } = req.params;
        const { _id: owner } = req.user;
        const result = await Notice.findByIdAndRemove(noticeId, owner);

        if (!result) {
            throw new NotFound('Not found');
        }

        res.status(200).json({
            status: 'success',
            message: 'notice deleted',
            code: 200,
            data: { result },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = removeFavoritesNoticeByUser;
