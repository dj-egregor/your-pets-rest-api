const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');
const { removeCLD } = require('../../helpers/cloudinary');

const removeUserNoticeById = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const { noticeId } = req.params;

        const notice = await Notice.findOneAndDelete({
            _id: noticeId,
            owner: userId,
        });

        if (!notice) {
            throw new NotFound(`Not found notice with id: ${noticeId}`);
        }

        await removeCLD(notice.photoPublicId);

        res.status(200).json({
            message: 'notice deleted',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = removeUserNoticeById;