// index.js
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

// Define associations between models
// For example, if a User has many Posts:
Post.belongsTo(User, { foreignKey: 'userId', onDelete: `CASCADE` });

// If a Post has many Comments:
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: `CASCADE` });
Comment.belongsTo(User, { foreignKey: 'userId', onDelete: `CASCADE` });

// export your models
module.exports = { Comment, Post, User };
