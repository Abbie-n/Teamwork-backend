const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/articles');

// ARTICLES ROUTES

router.post('/post', articleCtrl.createArticle);
router.patch('/:id', articleCtrl.updateArticle);
router.delete('/:id', articleCtrl.deleteOneArticle);
router.post('/:id/comment', articleCtrl.createComment);

module.exports = router;