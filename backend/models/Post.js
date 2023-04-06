const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');
const PostComment = require('./PostComment');

const Post = sequelize.define('Post', {
    id_post: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },      
    id_user: {  // id de l'utilisateur  (clé étrangère)     
        type: DataTypes.UUID,
    },          
    id_category: {  // id de la catégorie  (clé étrangère)
        type: DataTypes.UUID,
        defaultValue: null,
    },          
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },      
    content: {
        type: DataTypes.TEXT,
    },  
    publish: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },              
}, {
    // options
});

Post.hasMany(PostComment,{
    foreignKey: 'id_post',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
PostComment.belongsTo(Post, { foreignKey: 'id_post'});

module.exports = Post;