// config.js file:
// needed for Database configuration for Sequelize
// also will include setup for connecting to MySQL and defining Models to be used as a reference in other parts of my project
// necessary: Database_host, User, password, and the databse name + connection to Database (in this case MySQL2/workbench)

// IMPORTANT: Initializing sequelize requires 2 things
// - requiring it from Sequelize dependency, and creating a connection to the database:
const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}
module.exports = sequelize;