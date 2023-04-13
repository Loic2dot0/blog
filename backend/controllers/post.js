const Post = require('../models/Post');

// Create a new post
exports.createPost = (req, res, next) => {
    Post.create({
            id_user: req.headers.userid,
            id_category: req.body.id_category && req.body.id_category != '' ? req.body.id_category : null,
            title: req.body.title,
            content: req.body.content,
        })
        .then(() => res.status(201).json({message: 'Post created!'}))
        .catch(error => res.status(400).json({error: error}));
};

// Update a post
exports.updatePost = async (req, res, next) => {
    const post = await Post.findOne({
        where: {
            id_post: req.params.id_post
        }
    });

    if (!post) return res.status(404).json({error: 'Post not found!'});

    if(req.body.id_category) post.id_category = req.body.id_category != '' ? req.body.id_category : null;
    if(req.body.title) post.title = req.body.title;
    if(req.body.content) post.content = req.body.content;
    if(req.body.publish) post.publish = req.body.publish;
    
    post.save()
        .then(() => res.status(200).json({message: 'Post modified!', publish : post.publish}))
        .catch(error => res.status(500).json({error: error}));
};

// Delete a post        
exports.deletePost = async (req, res, next) => {
    const post = await Post.findOne({
        where: {
            id_post: req.params.id_post
        }
    });

    if (!post) return res.status(404).json({error: 'Post not found!'});

    Post.destroy({
            where: {
                id_post: req.params.id_post
            }
        })
        .then(() => res.status(200).json({message: 'Post deleted!'}))
        .catch(error => res.status(500).json({error: error}));
};

// Get all posts with status publish= false in first and updateAt in descending order
exports.getPostsFull = (req, res, next) => {
    const page = req.query.page ? req.query.page : 1;
    const category = req.query.category ? req.query.category : null;
    const where = category ? {id_category: category} : {};

    Post.findAndCountAll({
            where,
            order: [['publish', 'ASC'],
                    ['updatedAt', 'DESC']],
            limit: 10,
            offset: (page - 1) * 10,
        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => res.status(500).json({error: error}));
};

// Get one post
exports.getOnePostFull = (req, res, next) => {
    Post.findOne({
            where: {
                id_post: req.params.id_post
            }
        })
        .then(post => {
            if(!post) return res.status(404).json({error: 'Post not found!'});
            res.status(200).json(post);
        })
        .catch(error => res.status(500).json({error: error}));
}