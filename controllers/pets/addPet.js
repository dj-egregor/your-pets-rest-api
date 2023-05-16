const Pet = require('../../models/pet');

const addPet = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const pet = await Pet.create({ ...req.body, owner });

        const result = pet.toObject();
        delete result.createdAt;
        delete result.updatedAt;

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = addPet;
