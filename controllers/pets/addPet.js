const Pet = require('../../models/pet');
const { NotFound } = require('http-errors');

const path = require('path');
const fs = require('fs/promises');
const folder = 'pets-img';
const petsImgDir = path.join(__dirname, '../', '../', 'public', folder);
const resizeImage = require('../../utils/resizeImage/resizeImage');

const addPet = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { path: tempUpload, originalname } = req.file;
        const filename = `${_id}_${originalname}`;
        const resultUpload = path.join(petsImgDir, filename);

        const resizeResult = await resizeImage(tempUpload);
        if (!resizeResult) {
            throw new Error('Failed to resize image');
        }

        await fs.rename(tempUpload, resultUpload);
        const imageURL = path.join(folder, filename);

        const { _id: owner } = req.user;
        const { category } = req.params;

        const pet = await Pet.create({
            ...req.body,
            owner,
            category,
            photoURL: imageURL,
        });

        if (!pet) {
            throw new NotFound('Not found');
        }

        res.status(201).json(pet);
    } catch (error) {
        next(error);
    }
};


module.exports = addPet;