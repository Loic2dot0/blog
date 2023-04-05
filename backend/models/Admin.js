const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');

const Admin = sequelize.define('Admin', {
    id_user: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false,
});

module.exports = Admin;