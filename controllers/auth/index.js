const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./current');
const updateUserInfo = require('./updateUserInfo');
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');

module.exports = {
    register,
    login,
    logout,
    getCurrent,
    updateUserInfo,
    updateAvatar,
    verifyEmail,
    resendVerifyEmail,
};
