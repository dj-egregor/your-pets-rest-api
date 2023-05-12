const { NotFound } = require('http-errors');
const { User } = require('../../models/user');

const updateStatusNotice = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const { noticeId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            throw new NotFound(`Not found user with id: ${userId}`);
        }

        // нужна проверка на уже наличие такого об'явления или нет?

        const result = await User.findByIdAndUpdate(
            userId,
            { $push: { favorite: noticeId } },
            { new: true }
        ).populate('favorite');

        res.status(200).json({
            status: 'success',
            code: 200,
            data: { result },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateStatusNotice;
