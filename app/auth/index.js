const express = require('express');
const views = require('./views');

const router = express.Router();

router.post('/login', views.auth);
router.post('/register', views.register);

module.exports = router;
