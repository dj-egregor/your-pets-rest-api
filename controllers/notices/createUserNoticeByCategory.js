const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');
const fs = require('fs/promises');
const { uploadCLD } = require('../../helpers/cloudinary');

const createUserNoticeByCategory = async (req, res, next) => {
    try {
        if (req.file) {
            const result = await uploadCLD(req.file.path, 'users-notices');
            await fs.unlink(req.file.path);

            const { _id: owner } = req.user;
            const { category } = req.params;

            const notice = await Notice.create({
                ...req.body,
                owner,
                category,
                photoURL: result.url,
                photoPublicId: result.public_id,
            });

            if (!notice) {
                throw new NotFound('Not found');
            }

            res.status(201).json(notice);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = createUserNoticeByCategory;
