const knex = require('../db/connection');

const getById = id => {
  return knex('vehicleTypes')
    .select('*')
    .where({ id })
    .first();
};

const getAll = () => {
  return knex('vehicleTypes')
    .select('*');
};

module.exports = { getById, getAll };
