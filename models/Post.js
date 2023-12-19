// Post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define associations with other models
Post.associate = (models) => {
  Post.belongsTo(models.User, {
    foreignKey: 'userId',
  });

  Post.hasMany(models.Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
  });
};

module.exports = Post;
