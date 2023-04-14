const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

const postCommentCtrl = require('../controllers/postComment');

// Routes comments user auth
router.post('/', auth, postCommentCtrl.createComment);
router.put('/:id_comment', auth, postCommentCtrl.updateComment);
router.delete('/:id_comment', auth, postCommentCtrl.deleteComment);

// Routes comments all users
router.get('/post/:id_post', postCommentCtrl.getComments);
router.get('/:id_comment', postCommentCtrl.getOneComment);

// Routes comments admin only
router.delete('/delete/:id_comment', auth, authAdmin, postCommentCtrl.deleteAnyComment);

module.exports = router;