require('dotenv').config();


module.exports = {
    database: { 
      database: process.env.DB_NAME_TEST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dialect: 'postgres',
      storage: ':memory:',
      //storage: './database.postgres',
      logging: false,
      port: process.env.DB_PORT_TEST,
      host: process.env.DB_HOST_TEST,
    },
    uploadDir: 'uploads-test',
    profileDir: 'profile',
  };