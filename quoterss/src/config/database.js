require('dotenv').config();

const Sequelize = require('sequelize');

//npm config 
const config = require('config');
const dbConfig = config.get('database'); //database is into file /config/index
 /*
const dbConfig={ 
  database: process.env.DB_NAME_TEST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres',
  storage: ':memory:',
  //storage: './database.postgres',
  logging: false,
  port: process.env.DB_PORT_TEST,
  host: process.env.DB_HOST_TEST,
}*/

console.log('dbConfig es !!!! ');

module.exports= new Sequelize(
  dbConfig.database, 
  dbConfig.username, 
  dbConfig.password, {

    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    pool:{
      max: 5,  
      min: 0, 
      acquire: 30000,
      idle: 10000
  },
    logging: dbConfig.logging,
});



