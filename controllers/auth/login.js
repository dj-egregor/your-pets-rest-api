const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');

const { User } = require('../../models/user');
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Unauthorized('Email or password is wrong');
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw new Unauthorized('Email or password is wrong');
        }

        const payload = {
            id: user._id,
        };

        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        await User.findByIdAndUpdate(user._id, { token });

        res.json({
            token,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = login;
