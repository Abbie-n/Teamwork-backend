const express = require('express');
const router = express.Router();
const {auth} = require('../Middleware/auth');

const feedCtrl = require('../controllers/feed');

router.get('/', auth, feedCtrl.feeds);

module.exports = router;