const express = require('express');
const router = express.Router();

const gifCtrl = require('../controllers/gifs');

// GIFS ROUTES
router.post('/upload', gifCtrl.createGif);

module.exports = router;