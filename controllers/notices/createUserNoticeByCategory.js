const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const path = require('path');
const fs = require('fs/promises');
const noticesImgDir = path.join(__dirname, '../', '../', 'public', 'notices-img');
const resizeImage = require('../../utils/resizeImage/resizeImage');

const createUserNoticeByCategory = async (req, res, next) => {
    try {

        const { _id } = req.user;
        const { path: tempUpload, originalname } = req.file;
        const filename = `${_id}_${originalname}`;
        const resultUpload = path.join(noticesImgDir, filename);

        const resizeResult = await resizeImage(tempUpload);
        if (!resizeResult) {
            throw new Error('Failed to resize image');
        }

        await fs.rename(tempUpload, resultUpload);
        const imageURL = path.join('avatars', filename);

        const { _id: owner } = req.user;
        const { category } = req.params;

        const notice = await Notice.create({
            ...req.body,
            owner,
            category,
            photoURL: imageURL,
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
