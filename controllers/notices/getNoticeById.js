const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const getNoticeById = async (req, res, next) => {
    try {
        const { noticeId } = req.params;

        const notice = await Notice.findById(noticeId);

        if (!notice) {
            throw new NotFound(`Not found notice with id: ${noticeId}`);
        }

        res.json(notice);
    } catch (error) {
        next(error);
    }
};

module.exports = getNoticeById;
