const { NotFound } = require('http-errors');
const Pet = require('../../models/pet');
const { User } = require('../../models/user');

const getUserPets = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select(
            '-password -token'
        );
        const result = await Pet.find({ owner: userId }).select(
            '-createdAt -updatedAt'
        );
        if (result.length === 0) {
            throw new NotFound(`Not found ****PETS****`);
        }

        res.json({user, pets: result});
    } catch (error) {
        next(error);
    }
};

module.exports = getUserPets;
