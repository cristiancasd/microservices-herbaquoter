require('dotenv').config();

const development = require('./development');
const test = require('./test');

module.exports = {
  development,
  test,
};
