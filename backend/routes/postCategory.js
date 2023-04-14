const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

const postCategoryCtrl = require('../controllers/postCategory');

// Routes categories admin only
router.post('/', auth, authAdmin, postCategoryCtrl.createCategory);
router.put('/:id_category', auth, authAdmin, postCategoryCtrl.updateCategory);
router.delete('/:id_category', auth, authAdmin, postCategoryCtrl.deleteCategory);

// Routes categories all users
router.get('/', postCategoryCtrl.getCategories);

module.exports = router;