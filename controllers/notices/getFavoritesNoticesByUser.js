const { NotFound } = require('http-errors');
const { User } = require('../../models/user');

const getFavoritesNoticesByUser = async (req, res, next) => {
    try {
        console.log('KFDHJSFHDKSHJFJKHDSHKJDFJHS');
        const { _id: userId } = req.user;
        console.log('userIduserIduserId', userId);

        const notices = await User.findById(userId)
            .sort({ createdAt: -1 })
            .populate('favorite')
            .select('favorite');

        if (notices.favorite.length === 0) {
            throw new NotFound(
                `There are no notices for this requestRRRRRRRRRRR`
            );
        }

        res.json(notices);
    } catch (error) {
        next(error);
    }
};

module.exports = getFavoritesNoticesByUser;
