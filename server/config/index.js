require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

let MONGO_URI = {
  production: process.env.MONGO_URI,
  development: process.env.MONGO_DEV_URI,
  test: process.env.MONGO_TEST_URI,
};

module.exports = {
  PORT: 8081,
  MONGO_URI: MONGO_URI[env],
};
