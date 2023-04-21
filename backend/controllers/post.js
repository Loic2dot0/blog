const Post = require('../models/Post');
const PostCategory = require('../models/PostCategory');
const User = require('../models/User');

// Create a new post
exports.createPost = (req, res, next) => {
    Post.create({
            id_user: req.headers.userid,
            id_category: req.body.id_category && req.body.id_category != '' ? req.body.id_category : null,
            title: req.body.title,
            content: req.body.content,
        })
        .then(() => res.status(201).json({message: 'Post created!'}))
        .catch(error => res.status(500).json({error: error}));
};

// Update a post
exports.updatePost = async (req, res, next) => {
    let post;
    try {
        post = await Post.findOne({
            where: {
                id_post: req.params.id_post
            }
        });
        if (!post) return res.status(404).json({error: 'Post not found!'});
    } catch (error) {
        return res.status(500).json({error : error});
    }    

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
    let post;
    try {
        post = await Post.findOne({
            where: {
                id_post: req.params.id_post
            }
        });
        if (!post) return res.status(404).json({error: 'Post not found!'});
    } catch (error) {
        return res.status(500).json({error : error});
    } 

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
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limitDefault = 10;
    let limit = req.query.limit ? parseInt(req.query.limit) : limitDefault;
    limit = limit > 25 ? 25 : limit;
    const where = {};
    if(req.query.category) where.id_category = req.query.category == 'null' ? null : req.query.category;

    Post.findAndCountAll({
            where,
            include: [{
                model: PostCategory,
                attributes: ['category']
            },
            {
                model: User,
                attributes: ['name']
            }],
            order: [['publish', 'ASC'],
                    ['updatedAt', 'DESC']],
            limit,
            offset: (page - 1) * 10,
        })
        .then(posts => {
            posts.postsByPage = limit;
            res.status(200).json(posts);
        })
        .catch(error => res.status(500).json({error: error}));
};

// Get one post
exports.getOnePostFull = (req, res, next) => {
    Post.findOne({
            where: {
                id_post: req.params.id_post
            },
            include: [{
                model: PostCategory,
                attributes: ['category']
            },
            {
                model: User,
                attributes: ['name']
            }],
        })
        .then(post => {
            if(!post) return res.status(404).json({error: 'Post not found!'});
            res.status(200).json(post);
        })
        .catch(error => res.status(500).json({error: error}));
}

// Get all posts with status publish=true only, updateAt in descending order
exports.getPosts = (req, res, next) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limitDefault = 10;
    let limit = req.query.limit ? parseInt(req.query.limit) : limitDefault;
    limit = limit > 25 ? 25 : limit;
    const where = {
        publish: true
    };
    if(req.query.category) where.id_category = req.query.category == 'null' ? null : req.query.category;
    
    Post.findAndCountAll({
            where,
            include: [{
                model: PostCategory,
                attributes: ['category']
            },
            {
                model: User,
                attributes: ['name']
            }],
            order: [['updatedAt', 'DESC']],
            limit,
            offset: (page - 1) * limit,
        })
        .then(posts => {
            posts.postsByPage = limit;
            res.status(200).json(posts);
        })
        .catch(error => res.status(500).json({error: error}));
};

// Get one post width status publish=true only
exports.getOnePost = (req, res, next) => {
    Post.findOne({
            where: {
                id_post: req.params.id_post,
                publish: true
            },
            include: [{
                model: PostCategory,
                attributes: ['category']
            },
            {
                model: User,
                attributes: ['name']
            }],
        })
        .then(post => {
            if(!post) return res.status(404).json({error: 'Post not found!'});
            res.status(200).json(post);
        })
        .catch(error => res.status(500).json({error: error}));
}