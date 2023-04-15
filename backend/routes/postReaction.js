const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const postReactionCtrl = require('../controllers/postReaction');

router.post('/:id_post', auth, postReactionCtrl.createOrUpdateReaction);
router.get('/:id_post', postReactionCtrl.getAllReactions);

module.exports = router;