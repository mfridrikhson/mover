const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  database: process.env.DB_NAME,
  databaseTest: process.env.DB_NAME_TEST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};
