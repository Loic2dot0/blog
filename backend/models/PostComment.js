const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');

const PostComment = sequelize.define('Post_Comment', {   
    id_comment: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },  
    id_post: {  // id du post  (clé étrangère)  
        type: DataTypes.UUID,
        allowNull: false,
    },
    id_user: {  // id de l'utilisateur  (clé étrangère) 
        type: DataTypes.UUID,
    },      
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }  
}, {
    // options    
});

module.exports = PostComment;