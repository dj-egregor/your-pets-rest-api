const { NotFound } = require('http-errors');
const Pet = require('../../models/pet');

const getPetsByIdUser = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const result = await Pet.find({ owner: userId });

        if (result.length === 0) {
            throw new NotFound(`Not found`);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = getPetsByIdUser;
