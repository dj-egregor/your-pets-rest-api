const { NotFound } = require('http-errors');
const { User } = require('../../models/user');

const getFavoritesNoticesByUser = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;

        const result = await User.findById(userId)
            .populate('favorite')
            .select('favorite');

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
