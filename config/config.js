// config.js file:
// needed for Database configuration for Sequelize
// also will include setup for connecting to MySQL and defining Models to be used as a reference in other parts of my project
// necessary: Database_host, User, password, and the databse name + connection to Database (in this case MySQL2/workbench)

// IMPORTANT: Initializing sequelize requires 2 things
// - requiring it from Sequelize dependency, and creating a connection to the database:
const Sequelize = require(`sequelize`);

let sequelize;
// these are environmental variables which will come from the .env file ( stores sensitive information )
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// where we are creating that connection to the database:
sequelize = new Sequelize({
  dialect: `mysql`,
  // where we are using environmental variables (from .env file)
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

module.exports = sequelize;
