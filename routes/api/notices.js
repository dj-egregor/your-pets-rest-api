const express = require('express');

const { notices: ctrl } = require('../../controllers');
// const validation = require('../../middlewares/validation');
const authenticate = require('../../middlewares/authenticate');
// const { updateStatusNoticeSchema } = require('../../schemas/notices');

const router = express();

// створити ендпоінт для пошуку оголошеннь по заголовку
router.get('/search/:category', ctrl.getNoticesByTitle);

// створити ендпоінт для отримання оголошень по категоріям
router.get('/category/:category', ctrl.getNoticesByCategory);

// створити ендпоінт для отримання одного оголошення
router.get('/search/:noticeId', ctrl.getNoticeById);

// створити ендпоінт для додавання оголошення до обраних - тільки для зареєстр
// не получилось!

router.post('/favorites/:noticeId', authenticate, ctrl.updateStatusNotice);

// створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані - тільки для зареєстр
router.get('/favorites', authenticate, ctrl.getFavoritesNoticesByUser);

// створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних - тільки для зареєстр
// не удаляет!!! но запрос успешен
router.delete('/favorites/:id', authenticate, ctrl.removeFavoritesNoticeByUser);

// створити ендпоінт для додавання оголошень відповідно до обраної категорії - тільки для зареєстр
router.post(
    '/user-notices/:category',
    authenticate,
    ctrl.createUserNoticeByCategory
);

// створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем - тільки для зареєстр
router.get('/user-notices', authenticate, ctrl.getUserNotices);

// створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем - тільки для зареєстр
router.delete(
    '/user-notices/:noticeId',
    authenticate,
    ctrl.removeUserNoticeById
);

module.exports = router;
