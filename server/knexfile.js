const path = require('path');
const config = require('./config/db.config');

module.exports = {
  test: {
    client: 'postgresql',
    connection: {
      host: config.host,
      database: config.databaseTest,
      user: config.username,
      password: config.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve('data', 'migrations')
    },
    seeds: {
      directory: path.resolve('data','seeds')
    }
  },
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
    },
    seeds: {
      directory: path.resolve('data','seeds')
    }
  },
  production: {
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
    },
    seeds: {
      directory: path.resolve('data','seeds')
    }
  }
};
