const knex = require('../db/connection');

const getAll = async () => {
  return knex('users')
    .select('*');
};

module.exports = {
  getAll
};
