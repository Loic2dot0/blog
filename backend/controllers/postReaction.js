const PostReaction = require('../models/PostReaction');

// Create or Update a reaction
exports.createOrUpdateReaction = async (req, res, next) => {
    let userReaction;
    try {
        userReaction = await PostReaction.findOne({
            where: {
                id_user: req.headers.userid,
                id_post: req.params.id_post
            }
        });
    } catch (error) {
        return res.status(500).json({error : error});
    }

    if(userReaction) {
        if(req.body.reaction) userReaction.reaction = req.body.reaction;
        userReaction.save()
            .then(() => res.status(200).json({
                message: 'Reaction modified!',
                reaction: userReaction.reaction}
            ))
            .catch(error => res.status(500).json({error: error}));
    } else {
        PostReaction.create({
                id_user: req.headers.userid,
                id_post: req.params.id_post,
                reaction: req.body.reaction,
            })
            .then(() => res.status(201).json({
                message: 'Reaction created!',
                reaction: req.body.reaction
            }))
            .catch(error => res.status(500).json({error: error}));
    }
};

// Get all reactions of a post
exports.getAllReactions = async (req, res, next) => {
    let userReaction;
    if(req.headers.userid){
        try {
            userReaction = await PostReaction.findOne({
                where: {
                    id_user: req.headers.userid,
                    id_post: req.params.id_post
                }
            });
        } catch (error) {
            return res.status(500).json({error : error});
        }
    }

    PostReaction.findAll({
            where: {
                id_post: req.params.id_post
            },
            attributes: ['reaction']
        })
        .then(reactions => res.status(200).json({
            reactions,
            userReaction: userReaction === undefined ? undefined : userReaction.reaction
        }))
        .catch(error => res.status(500).json({error: error}));
};