const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const getNoticeById = async (req, res, next) => {
    try {
        const { noticeId } = req.params;

        const result = await Notice.findById(noticeId);

        if (!result) {
            throw new NotFound(`Not found`);
        }

        res.status(200).json({
            status: 'success',
            code: 200,
            data: { result },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getNoticeById;