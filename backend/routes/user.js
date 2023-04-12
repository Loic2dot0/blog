const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const userCtrl = require('../controllers/user');

// Route globale
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user', auth, userCtrl.getUser);
router.put('/user', auth, multer, userCtrl.updateUser);
router.delete('/user', auth, userCtrl.deleteUser);

// Routes réservée aux administrateurs
router.post('/admin/login', userCtrl.loginAdmin);

module.exports = router;