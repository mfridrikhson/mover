const path = require('path');
const config = require('./config/db.config');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: config.database,
      user: config.username,
      password: config.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve('data', 'migrations')
    }
  }
};
