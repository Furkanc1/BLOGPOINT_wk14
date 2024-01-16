// Comment.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
// Comments Model / TABLE in MySQL workbench
class Comment extends Model {}

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
  }
);

module.exports = Comment;