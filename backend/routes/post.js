const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

const postctrl = require('../controllers/post');

// Routes posts admin only
router.post('/', auth, authAdmin, postctrl.createPost);
router.put('/:id_post', auth, authAdmin, postctrl.updatePost);
router.delete('/:id_post', auth, authAdmin, postctrl.deletePost);

module.exports = router;