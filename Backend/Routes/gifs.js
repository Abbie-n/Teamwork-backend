const express = require('express');
const router = express.Router();
const {auth} = require('../Middleware/auth');

const gifCtrl = require('../controllers/gifs');

// GIFS ROUTES
router.post('/upload', auth, gifCtrl.createGif);
router.delete('/:id', auth, gifCtrl.deleteOneGif);
router.post('/:id/comment', auth, gifCtrl.createComment);
router.get('/:id', auth, gifCtrl.getOneGif);

module.exports = router;