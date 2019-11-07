const express = require('express');
const router = express.Router();

const userCtrl =require('../controllers/user');

// USERS ROUTES

router.post('/signup', userCtrl.signup);

module.exports = router;