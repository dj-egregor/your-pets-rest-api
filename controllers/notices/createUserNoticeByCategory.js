const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const createUserNoticeByCategory = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { category } = req.params;

        const notice = await Notice.create({
            ...req.body,
            owner,
            category,
            photoURL: req.file.path,
        });

        if (!notice) {
            throw new NotFound('Not found');
        }

        res.status(201).json(notice);
    } catch (error) {
        next(error);
    }
};

module.exports = createUserNoticeByCategory;
