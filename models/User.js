// User.js:
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
// creation of USER model / table in SQLWorkbench 
class User extends Model {
  checkPassword(loginPassword) {
    // can try to implement Bcrypt in the future into this application in order to get better first hand experience.
    return loginPassword == this.password;
  }
};

// what is included in each column of the USER TABLE (id, name, pass)
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: `User`
  }
);

module.exports = User;
