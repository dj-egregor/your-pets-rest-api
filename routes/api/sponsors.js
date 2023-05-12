const express = require('express');

const { sponsors: ctrl } = require('../../controllers');

const router = express();

router.get('/', ctrl.getSponsors);

module.exports = router;
