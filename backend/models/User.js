const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');

const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    avatar:{
        type: DataTypes.STRING,
        defaultValue: null
    },
},{
    timestamps: false,
});

module.exports = User;