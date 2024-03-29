require('dotenv').config();
require('colors');

const { app } = require('./src/app');
const sequelize = require('./src/database/config');

const start = async () => {
  if (!process.env.PORT) {
    console.log('no hay puerto ');
    throw new Error('JWT_KEY must be defined');
  }

  const port = process.env.PORT;

  let wrongConnection = true;
  while (wrongConnection) {
    try {
      console.log('voy a intentar conectar GitAction');
      await sequelize.sync();
      console.log('conectado a la  db'.yellow); 
      wrongConnection = false;
    } catch (error) {
      console.log('error conectand a la db'.red);
      await sleep(3000);
      function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
    }
  }

  app.listen(port, () => {
    console.log('servidor corriendo en port ', port);
  });
};

start();
