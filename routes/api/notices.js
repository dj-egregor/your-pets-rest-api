const express = require('express');

const { notices: ctrl } = require('../../controllers');
const validation = require('../../middlewares/validation');
const authenticate = require('../../middlewares/authenticate');
const { updateStatusNoticeSchema } = require('../../schemas/notices');

const router = express();

// створити ендпоінт для пошуку оголошеннь по заголовку
router.get('/search/:title', ctrl.getNoticesByTitle);

// створити ендпоінт для отримання оголошень по категоріям
router.get('/category/:category', ctrl.getNoticesByCategory);

// створити ендпоінт для отримання одного оголошення
router.get('/:noticeId', ctrl.getNoticeById);

// створити ендпоінт для додавання оголошення до обраних - тільки для зареєстр
// router.post(
//     '/favorites/:id',
//     authenticate,
//     validation.validate(updateStatusNoticeSchema),
//     ctrl.updateStatusNotice
// );

// створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані - тільки для зареєстр
// router.get('/favorites', ctrl.getFavoritesNoticesByUser);

// створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних - тільки для зареєстр
// router.delete('/favorites/:id', ctrl.removeFavoritesNoticeByUser);

// створити ендпоінт для додавання оголошень відповідно до обраної категорії - тільки для зареєстр
// router.post('/category/:category', ctrl.createNoticeByCategory);

// створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем - тільки для зареєстр

// створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем - тільки для зареєстр

module.exports = router;
