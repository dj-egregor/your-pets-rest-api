const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const createUserNoticeByCategory = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { category } = req.params;

        const result = await Notice.create({
            ...req.body,
            owner,
            category,
            photoURL: req.file.path,
        });

        if (!result) {
            throw new NotFound('Not found');
        }

        res.status(201).json({
            status: 'success',
            code: 201,
            data: { result },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createUserNoticeByCategory;
