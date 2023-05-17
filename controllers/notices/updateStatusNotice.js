const { NotFound } = require('http-errors');
const { User } = require('../../models/user');
const Notice = require('../../models/notice');

const updateStatusNotice = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const { noticeId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            throw new NotFound(`Not found user with id: ${userId}`);
        }

        const notice = await Notice.findById(noticeId);
        if (!notice) {
            throw new NotFound(`Not found notice with id: ${noticeId}`);
        }

        if (user.favorite.includes(noticeId)) {
            throw new NotFound(
                `Notice with id=${noticeId} is already in user's favorite list`
            );
        }

        const result = await User.findByIdAndUpdate(
            userId,
            { $push: { favorite: noticeId } },
            { new: true }
        ).populate('favorite');

        if (!result) {
            throw new NotFound('Not found');
        }

        res.json({
            messages: 'Notice add',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateStatusNotice;
