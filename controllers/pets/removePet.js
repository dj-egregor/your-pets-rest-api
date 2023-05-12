const { NotFound } = require('http-errors');
const Pet = require('../../models/pet');

const removePet = async (req, res, next) => {
    try {
        const { petId } = req.params;
        const deletedPet = await Pet.findOneAndDelete({
            _id: petId,
            owner: req.user._id,
        });
        if (!deletedPet) {
            throw new NotFound(`Pet with id ${petId} not found`);
        }
        res.json({ message: 'Pet deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = removePet;
