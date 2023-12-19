// index.js
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

// Define associations between models
// For example, if a User has many Posts:
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

// If a Post has many Comments:
Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// export your models
module.exports = { Comment, Post, User };
