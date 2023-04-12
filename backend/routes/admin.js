const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminCtrl = require('../controllers/admin');

// Routes réservée aux administrateurs
router.post('/login', userCtrl.loginAdmin);
router.get('/', auth, userCtrl.getAdmin);

module.exports = router;