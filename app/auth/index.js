const express = require('express');
const views = require('./views');

const router = express.Router();

router.post('/login', views.auth);

module.exports = router;
