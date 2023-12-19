// User.js:
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const User = sequelize.define('User', {
  // Define fields here, for example:
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations with other models
User.associate = (models) => {
  User.hasMany(models.Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });

  User.hasMany(models.Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
};

module.exports = User;
