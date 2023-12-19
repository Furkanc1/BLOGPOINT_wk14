// Comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define associations with other models
Comment.associate = (models) => {
  Comment.belongsTo(models.User, {
    foreignKey: 'userId',
  });

  Comment.belongsTo(models.Post, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
  });
};

module.exports = Comment;
