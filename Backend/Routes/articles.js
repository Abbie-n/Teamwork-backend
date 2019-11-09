const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/articles');

// ARTICLES ROUTES

router.post('/post', articleCtrl.createArticle);

module.exports = router;