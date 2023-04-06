const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');

const PostReaction = sequelize.define('Post_Reaction', {   
    id_post: {  // id du post  (clé étrangère)  
        type: DataTypes.UUID,
        allowNull: false,
    },
    id_user: {  // id de l'utilisateur  (clé étrangère) 
        type: DataTypes.UUID,
        allowNull: false,
    },      
    reaction: {
        type: DataTypes.TEXT,
        allowNull: false,
    }  
}, {
    timestamps: false,  
});

module.exports = PostReaction;