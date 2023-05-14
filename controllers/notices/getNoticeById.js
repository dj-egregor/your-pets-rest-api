const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const getNoticeById = async (req, res, next) => {
    try {
        const { noticeId } = req.params;

        const result = await Notice.findById(noticeId);

        if (!result) {
            throw new NotFound(`Not found notice with id: ${noticeId}`);
        }

        res.status(201).json({
            result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getNoticeById;
