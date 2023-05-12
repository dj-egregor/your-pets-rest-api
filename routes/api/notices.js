const express = require('express');

const { notices: ctrl } = require('../../controllers');
// const isValidId = require('../../middlewares/isValidId');

const authenticate = require('../../middlewares/authenticate');

const router = express();

router.get('/search/:category', ctrl.getNoticesByTitle);
router.get('/category/:category', ctrl.getNoticesByCategory);
router.get('/notice/:noticeId', ctrl.getNoticeById);

router.post(
    '/favorites/:noticeId',
    authenticate,

    ctrl.updateStatusNotice
);
router.get('/favorites', authenticate, ctrl.getFavoritesNoticesByUser);
router.delete(
    '/favorites/:noticeId',
    authenticate,
    ctrl.removeFavoritesNoticeByUser
);

router.post(
    '/user-notices/:category',
    authenticate,
    ctrl.createUserNoticeByCategory
);
router.get('/user-notices', authenticate, ctrl.getUserNotices);
router.delete(
    '/user-notices/:noticeId',
    authenticate,
    ctrl.removeUserNoticeById
);

module.exports = router;
