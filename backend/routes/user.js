const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Route globale
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user', userCtrl.getUser);
router.put('/user', userCtrl.updateUser);
router.delete('/user', userCtrl.deleteUser);

// Routes réservée aux administrateurs
router.post('/admin/login', userCtrl.loginAdmin);

module.exports = router;