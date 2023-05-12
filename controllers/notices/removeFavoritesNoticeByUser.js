const { NotFound } = require('http-errors');
const { User } = require('../../models/user');
// const Notice = require('../../models/notice');

const removeFavoritesNoticeByUser = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const { noticeId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            throw new NotFound(`Not found user with id: ${userId}`);
        }

        const result = await User.findByIdAndUpdate(
            userId,
            { $pull: { favorite: noticeId } },
            { new: true }
        ).populate('favorite');

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
