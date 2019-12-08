const knex = require('../db/connection');

const getById = id => {
  return knex('vehicles')
    .select('*')
    .where({ id })
    .first();
};

const getByDriverId = driverId => {
  return knex('vehicles')
    .select('*')
    .where({ driverId });
};

const add = vehicle => {
  return knex('vehicles')
    .insert(vehicle)
    .returning('*');
};

module.exports = {
  getById,
  getByDriverId,
  add
};
