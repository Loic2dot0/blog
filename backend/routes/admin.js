const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');

// Routes réservée aux administrateurs
router.get('/:id_user', adminCtrl.getUserIsAdmin);

module.exports = router;