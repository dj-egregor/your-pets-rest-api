const { NotFound } = require('http-errors');

const { User } = require('../../models/user');

const updateUserInfo = async (req, res, next) => {
    try {
        const { _id } = req.user;

        const result = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
        }).select('-password -token');

        if (!result) {
            throw new NotFound('Not found');
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = updateUserInfo;
