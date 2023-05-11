const getNoticesByCategory = require('./getNoticesByCategory');
const getNoticesByTitle = require('./getNoticesByTitle');
const getNoticeById = require('./getNoticeById');
const updateStatusNotice = require('./updateStatusNotice');
const getFavoritesNoticesByUser = require('./getFavoritesNoticesByUser');
const removeFavoritesNoticeByUser = require('./removeFavoritesNoticeByUser');
const createNoticeByCategory = require('./createNoticeByCategory');

module.exports = {
    getNoticesByCategory,
    getNoticesByTitle,
    getNoticeById,
    updateStatusNotice,
    getFavoritesNoticesByUser,
    removeFavoritesNoticeByUser,
    createNoticeByCategory,
};
