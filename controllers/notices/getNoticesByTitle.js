const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const getNoticesByTitle = async (req, res, next) => {
    try {
        const { title } = req.params;
        const regex = new RegExp(title, 'i');
        const { page = 1, limit = 12 } = req.query;
        const skip = (page - 1) * limit;

        const result = await Notice.find({ title: regex })
            .skip(skip)
            .limit(limit);

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

module.exports = getNoticesByTitle;
