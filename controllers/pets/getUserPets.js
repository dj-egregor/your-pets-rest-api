const { NotFound } = require('http-errors');
const Pet = require('../../models/pet');

const getUserPets = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const result = await Pet.find({ owner: userId });

        if (result.length === 0) {
            throw new NotFound(`Not found ****PETS****`);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = getUserPets;
