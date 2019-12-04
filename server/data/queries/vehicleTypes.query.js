const knex = require('../db/connection');

const getAll = () => {
  return knex('vehicleTypes')
    .select('*');
};

module.exports = { getAll };
