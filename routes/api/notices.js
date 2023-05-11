const express = require('express');

const { notices: ctrl } = require('../../controllers');

const router = express();

// створити ендпоінт для пошуку оголошеннь по заголовку
router.get('/search/:title', ctrl.getNoticesByTitle);

// створити ендпоінт для отримання оголошень по категоріям
router.get('category/:category', ctrl.getNoticesByCategory);

// створити ендпоінт для отримання одного оголошення
router.get('category/:id', ctrl.getNoticeById);

// створити ендпоінт для додавання оголошення до обраних
router.post('/favorites/:id', ctrl.updateStatusNotice);

// створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані
router.get('/favorites', ctrl.getFavoritesNoticesByUser);

// створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних
router.delete('/favorites/:id', ctrl.removeFavoritesNoticeByUser);

// створити ендпоінт для додавання оголошень відповідно до обраної категорії
router.post('/category/:category', ctrl.createNoticeByCategory);

// створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем

// створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем

module.exports = router;
