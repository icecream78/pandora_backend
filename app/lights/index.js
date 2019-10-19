const express = require('express');
const views = require('./views');

const router = express.Router();

router.post('/create', views.create);
router.put('/edit', views.edit);
router.put('/switch', views.switch);

module.exports = router;
