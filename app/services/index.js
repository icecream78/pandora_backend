const express = require('express');
const views = require('./views');

const router = express.Router();

router.get('/manufactures', views.manufactures);
router.get('/users', views.users);

module.exports = router;
