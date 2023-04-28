const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');

// Routes réservée aux administrateurs
router.get('/', adminCtrl.isAdmin);

module.exports = router;