const { NotFound } = require('http-errors');
const Pet = require('../../models/pet');
const { removeCLD } = require('../../helpers/cloudinary');

const removePet = async (req, res, next) => {

    try {
        const { petId } = req.params;
        const pet = await Pet.findById(petId);

        if (!pet) {
            throw new NotFound('Pet not found');
        }
        if (pet.photoPublicId) {
            await removeCLD(pet.photoPublicId);
        }
        await Pet.deleteOne({ _id: petId });

        res.json({ message: 'Pet deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = removePet;
