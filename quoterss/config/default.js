
require('dotenv').config();

module.exports = { 
    database: {
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dialect: 'postgres',
      storage: './database.postgres',
      logging: false,
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
    },
    uploadDir: 'uploads-dev',
    profileDir: 'profile',
  };