const express = require('express');
const { auth } = require('../Middleware/auth');

const router = express.Router();

const userCtrl = require('../controllers/user');

// USERS ROUTES

router.post('/create-user', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/user/:id', auth, userCtrl.deleteUser);
router.patch('/user/:id', auth, userCtrl.updateUser);
router.get('/user/:id', auth, userCtrl.getOneUser);

module.exports = router;
