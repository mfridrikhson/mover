const knex = require('../db/connection');

const getById = id => {
  return knex('orders')
    .select('*')
    .where({ id })
    .first();
};

const add = image => {
  return knex('orders')
    .insert(image)
    .returning('*');
};

module.exports = { getById, add };
