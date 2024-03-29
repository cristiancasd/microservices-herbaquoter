require('dotenv').config();

const Sequelize = require('sequelize');

//npm config
const config = require('config');
const dbConfig = config.get('database'); //database info is into file ../config/index

module.exports = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: dbConfig.logging,
});
