const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const multer = require('../middleware/multer');
const userCtrl = require('../controllers/user');

// Route user
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', auth, userCtrl.getUser);
router.get('/email', userCtrl.getUserEmailExist);
router.get('/name', userCtrl.getUserNameExist);
router.put('/', auth, multer, userCtrl.updateUser);
router.delete('/', auth, userCtrl.deleteUser);
router.delete('/:id_user', auth, authAdmin, userCtrl.deleteAUser);

module.exports = router;