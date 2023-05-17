const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');
const { v4: uuidv4 } = require('uuid');

const path = require('path');
const fs = require('fs/promises');
const folder = 'notices-img';
const noticesImgDir = path.join(__dirname, '../', '../', 'public', folder);
const resizeImage = require('../../utils/resizeImage/resizeImage');

const createUserNoticeByCategory = async (req, res, next) => {
    try {
        const { path: tempUpload, originalname } = req.file;

        const extension = path.extname(originalname);
        const uniqueFilename = uuidv4() + extension;

        const resultUpload = path.join(noticesImgDir, uniqueFilename);

        const resizeResult = await resizeImage(tempUpload);
        if (!resizeResult) {
            throw new Error('Failed to resize image');
        }

        await fs.rename(tempUpload, resultUpload);
        const imageURL = path.join(folder, uniqueFilename);

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
