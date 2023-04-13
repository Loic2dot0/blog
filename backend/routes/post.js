const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

const postctrl = require('../controllers/post');

// Routes posts admin only
router.post('/', auth, authAdmin, postctrl.createPost);
router.put('/:id_post', auth, authAdmin, postctrl.updatePost);
router.delete('/:id_post', auth, authAdmin, postctrl.deletePost);
router.get('/full', auth, authAdmin, postctrl.getPostsFull);
router.get('/full/:id_post', auth, authAdmin, postctrl.getOnePostFull);

// Routes posts all users
router.get('/', postctrl.getPosts);
router.get('/:id_post', postctrl.getOnePost);

module.exports = router;