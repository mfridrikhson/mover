const knex = require('../db/connection');

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
  getByDriverId,
  add
};
