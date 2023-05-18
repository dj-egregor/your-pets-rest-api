const Pet = require('../../models/pet');
const { NotFound } = require('http-errors');
const fs = require('fs/promises');
const { uploadCLD } = require('../../helpers/cloudinary');

const addPet = async (req, res, next) => {
    try {
        if (req.file) {
            const result = await uploadCLD(req.file.path, 'users-pets');
            await fs.unlink(req.file.path);

            const { _id: owner } = req.user;
            const { category } = req.params;

            const pet = await Pet.create({
                ...req.body,
                owner,
                category,
                photoURL: result.url,
                photoPublicId: result.public_id,
            });

            if (!pet) {
                throw new NotFound('Not found');
            }

            res.status(201).json(pet);
        }
    }
    catch (error) {
        next(error);
    }
};

module.exports = addPet;