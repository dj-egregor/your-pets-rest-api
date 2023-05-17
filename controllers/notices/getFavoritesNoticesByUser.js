const { NotFound } = require('http-errors');
const { User } = require('../../models/user');

const getFavoritesNoticesByUser = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;

        const notices = await User.findById(userId)
            .populate('favorite')
            .select('favorite');

        if (notices.favorite.length === 0) {
            throw new NotFound(`There are no notices for this request`);
        }

        res.json(notices);
    } catch (error) {
        next(error);
    }
};

module.exports = getFavoritesNoticesByUser;
