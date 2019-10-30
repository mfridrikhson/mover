const knex = require('../db/connection');

const getById = id => {
  return knex('orders')
    .select('*')
    .where({ id })
    .first();
};

module.exports = { getById };
