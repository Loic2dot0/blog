const PostComment = require('../models/PostComment');
const User = require('../models/User');

// Create a new comment
exports.createComment = (req, res, next) => {
    PostComment.create({
            id_user: req.headers.userid,
            id_post: req.body.id_post,
            content: req.body.content,
        })
        .then(() => res.status(201).json({ message: 'Comment created!'}))
        .catch(error => res.status(500).json({ error }));
};

// Update a comment
exports.updateComment = async (req, res, next) => {
    let comment;
    try {
        comment = await PostComment.findOne({
            where: {
                id_comment: req.params.id_comment
            }
        });
    
        if (!comment) return res.status(404).json({ error: 'Comment not found!' });
    } catch (error) {
        return res.status(500).json({error : error});
    }

    if(comment.id_user != req.headers.userid) return res.status(401).json({ error: 'Unauthorized!' });
    if (req.body.content) comment.content = req.body.content;

    comment.save()
        .then(() => res.status(200).json({ message: 'Comment modified!' }))
        .catch(error => res.status(500).json({ error }));
};

// Delete a comment
exports.deleteComment = async (req, res, next) => {
    let comment;
    try {
        comment = await PostComment.findOne({
            where: {
                id_comment: req.params.id_comment
            }
        });
    
        if (!comment) return res.status(404).json({ error: 'Comment not found!' });
    } catch (error) {
        return res.status(500).json({error : error});
    }

    if(comment.id_user != req.headers.userid) return res.status(401).json({ error: 'Unauthorized!' });

    PostComment.destroy({
            where: {
                id_comment: req.params.id_comment
            }
        })
        .then(() => res.status(200).json({ message: 'Comment deleted!' }))
        .catch(error => res.status(500).json({ error }));
}

// Get all comments
exports.getComments = (req, res, next) => {
    PostComment.findAndCountAll({
            where: {
                id_post: req.params.id_post
            },
            include: [{
                model: User,
                attributes: ['name', 'avatar']
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({ error }));
}

// Get one comment
exports.getOneComment = (req, res, next) => {
    PostComment.findOne({
            where: {
                id_comment: req.params.id_comment,
            },
            include: [{
                model: User,
                attributes: ['name', 'avatar']
            }]
        })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(500).json({ error }));
}

// Delete any comment, only Admin
exports.deleteAnyComment = async (req, res, next) => {
    let comment;
    try {
        comment = await PostComment.findOne({
            where: {
                id_comment: req.params.id_comment
            }
        });
    
        if (!comment) return res.status(404).json({ error: 'Comment not found!' });
    } catch (error) {
        return res.status(500).json({error : error});
    }
    
    PostComment.destroy({
            where: {
                id_comment: req.params.id_comment
            }
        })
        .then(() => res.status(200).json({ message: 'Comment deleted!' }))
        .catch(error => res.status(500).json({ error }));
}