const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');
const Post = require('./Post');

const PostCategory = sequelize.define('PostCategory', {
    id_category: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // options
    timestamps: false,  
});

PostCategory.hasMany(Post,{
    foreignKey: 'id_category',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});
Post.belongsTo(PostCategory, { foreignKey: 'id_category'});

module.exports = PostCategory;