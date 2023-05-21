const getNoticesByCategory = require('./getNoticesByCategory');
const getNoticesByTitle = require('./getNoticesByTitle');
const getNoticeById = require('./getNoticeById');
const getNoticesSearchByTitleAndCategory = require('./getNoticesSearchByTitleAndCategory');

const updateStatusNotice = require('./updateStatusNotice');
const getFavoritesNoticesByUser = require('./getFavoritesNoticesByUser');
const removeFavoritesNoticeByUser = require('./removeFavoritesNoticeByUser');

const createUserNoticeByCategory = require('./createUserNoticeByCategory');
const getUserNotices = require('./getUserNotices');
const removeUserNoticeById = require('./removeUserNoticeById');

module.exports = {
    getNoticesByCategory,
    getNoticesByTitle,
    getNoticeById,
    getNoticesSearchByTitleAndCategory,
    updateStatusNotice,
    getFavoritesNoticesByUser,
    removeFavoritesNoticeByUser,
    createUserNoticeByCategory,
    getUserNotices,
    removeUserNoticeById,
};
