const bcrypt = require('bcrypt');
const { Conflict } = require('http-errors');
const jwt = require('jsonwebtoken');

const gravatar = require('gravatar');

const { SECRET_KEY } = process.env;

const verifyPet = require('../../helpers/verifyPet');
const { User } = require('../../models/user');

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw new Conflict('Email in use');
        }

        const avatarURL = gravatar.url(email);
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            ...req.body,
            password: hashPassword,
            avatarURL,
        });
        verifyPet(newUser._id.toString());

        const token = jwt.sign({ id: newUser._id }, SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        await User.findByIdAndUpdate(newUser._id, { token });

        res.status(201).json({
            token,
            user: {
                email: newUser.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = register;
