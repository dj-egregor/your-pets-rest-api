const { NotFound } = require('http-errors');
const { User } = require('../../models/user');
const Notice = require('../../models/notice');

const fs = require('fs/promises');
const path = require('path');

const removeUserNoticeById = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const { noticeId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            throw new NotFound(`Not found user with id: ${userId}`);
        }

        const result = await Notice.findByIdAndRemove(noticeId, userId);

        if (!result) {
            throw new NotFound(`Notice with id=${noticeId} not found`);
        }

        const imagePath = path.join(
            __dirname,
            '../',
            '../',
            'public',
            result.photoURL
        );
        await fs.unlink(imagePath);

        res.status(200).json({
            message: 'notice deleted',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = removeUserNoticeById;
