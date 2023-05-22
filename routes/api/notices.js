const express = require('express');

const { notices: ctrl } = require('../../controllers');

const validation = require('../../middlewares/validation');
const isValidId = require('../../middlewares/isValidId');
const authenticate = require('../../middlewares/authenticate');
const upload = require('../../middlewares/upload');

const { addNoticeSchema } = require('../../schemas/notices');

const router = express();

router.get('/search/:category', ctrl.getNoticesByTitle);
router.get('/notices/:category', ctrl.getNoticesSearchByTitleAndCategory);
router.get('/category/:category', ctrl.getNoticesByCategory);
router.get('/notice/:noticeId', isValidId('noticeId'), ctrl.getNoticeById);
router.get('/favorites', authenticate, ctrl.getFavoritesNoticesByUser);
router.get('/user-notices', authenticate, ctrl.getUserNotices);

router.post(
    '/favorites/:noticeId',
    authenticate,
    isValidId('noticeId'),
    ctrl.updateStatusNotice
);

router.post(
    '/user-notices/:category',
    authenticate,
    upload.single('photo'),
    validation.validate(addNoticeSchema),
    ctrl.createUserNoticeByCategory
);

router.delete(
    '/favorites/:noticeId',
    authenticate,
    isValidId('noticeId'),
    ctrl.removeFavoritesNoticeByUser
);

router.delete(
    '/user-notices/:noticeId',
    authenticate,
    isValidId('noticeId'),
    ctrl.removeUserNoticeById
);

module.exports = router;
