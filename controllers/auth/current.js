const getCurrent = async (req, res, next) => {
    try {
        const user = { ...req.user.toObject() };
        delete user.password;

        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = getCurrent;
