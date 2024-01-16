// Post.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

class Post extends Model {}
// creating post body preferences (must be string for creation of title + whatever the post is)
Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    allowNull: false,
  },
  {
    sequelize,
    freezeTableName: true,
  }
);

module.exports = Post;
