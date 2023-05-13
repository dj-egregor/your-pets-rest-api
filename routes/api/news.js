const express = require('express');

const { news: ctrl } = require('../../controllers');

const router = express();

router.get('/', ctrl.getNews);
router.get('/search', ctrl.getNewsByTitle);

module.exports = router;
