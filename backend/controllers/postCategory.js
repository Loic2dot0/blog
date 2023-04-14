const PostCategory = require('../models/PostCategory');

// Create a new category
exports.createCategory = (req, res, next) => {
    PostCategory.create({
            category: req.body.category,
        })
        .then(() => res.status(201).json({message: 'Category created!'}))
        .catch(error => res.status(500).json({error: error}));
};

// Update a category
exports.updateCategory = async (req, res, next) => {
    const category = await PostCategory.findOne({
        where: {
            id_category: req.params.id_category
        }
    });

    if (!category) return res.status(404).json({error: 'Category not found!'});

    if(req.body.category) category.category = req.body.category;
    
    category.save()
        .then(() => res.status(200).json({message: 'Category modified!'}))
        .catch(error => res.status(500).json({error: error}));
};

// Delete a category
exports.deleteCategory = async (req, res, next) => {
    const category = await PostCategory.findOne({
        where: {
            id_category: req.params.id_category
        }
    });

    if (!category) return res.status(404).json({error: 'Category not found!'});

    PostCategory.destroy({
            where: {
                id_category: req.params.id_category
            }
        })
        .then(() => res.status(200).json({message: 'Category deleted!'}))
        .catch(error => res.status(500).json({error: error}));
};

// Get all categories
exports.getCategories = (req, res, next) => {
    PostCategory.findAll()
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(500).json({error: error}));
};