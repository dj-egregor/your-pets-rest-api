const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');

const refreshToken = async (req, res, next) => {
    try {
        const { token } = req.user;
        console.log("************", token, "************");
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Verify the token to ensure it is valid
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('??????', decoded, '??????');
        // Generate a new token
        const newToken = jwt.sign({ id: decoded.id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        // Save a new user token
        await User.findByIdAndUpdate(decoded.id, { token: newToken });
        // Send the new token in the response
        res.status(200).json({ token: newToken });
    } catch (error) {
        next(error);
    }
};

module.exports = refreshToken;
