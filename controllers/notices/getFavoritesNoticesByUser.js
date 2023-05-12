const { NotFound } = require('http-errors');
const { User } = require('../../models/user');
// const Notice = require('../../models/notice');

const getFavoritesNoticesByUser = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;

        const result = await User.findById(userId).populate('favorite');

        console.log(result);

        // if (!result) {
        //     throw new NotFound('Not found');
        // }

        // const noticeUser = await User.findById(userId)
        //     .populate({
        //         path: 'notice',
        //         model: Notice,
        //     })
        //     .exec();

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
