const express = require('express');
const router = express.Router();

const gifCtrl = require('../controllers/gifs');

// GIFS ROUTES
router.post('/upload', gifCtrl.createGif);
router.delete('/:id', gifCtrl.deleteOneGif);
router.post('/:id/comment', gifCtrl.createComment);
router.get('/:id', gifCtrl.getOneGif);

module.exports = router;