const Pet = require('../../models/pet');

const addPet = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const result = await Pet.create({ ...req.body, owner });

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = addPet;
