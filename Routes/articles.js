const express = require('express');

const router = express.Router();
const { auth } = require('../Middleware/auth');

const articleCtrl = require('../controllers/articles');

// ARTICLES ROUTES

router.post('/post', auth, articleCtrl.createArticle);
router.patch('/:id', auth, articleCtrl.updateArticle);
router.delete('/:id', auth, articleCtrl.deleteOneArticle);
router.post('/:id/comment', auth, articleCtrl.createComment);
router.delete('/:id/comment/:id', auth, articleCtrl.deleteComment);
router.get('/:id', auth, articleCtrl.getOneArticle);
router.patch('/:id/flag', auth, articleCtrl.markInappropriate);

module.exports = router;
