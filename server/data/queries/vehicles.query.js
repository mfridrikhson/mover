const knex = require('../db/connection');

const getAll = () => {
  return knex('vehicles')
    .select('*');
};

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

const getByVehicleTypeId = vehicleTypeId => {
  return knex('vehicles')
    .select('*')
    .where({ vehicleTypeId });
};

const add = vehicle => {
  return knex('vehicles')
    .insert(vehicle)
    .returning('*');
};

const deleteById = id => {
  return knex('vehicles')
    .del()
    .where({ id })
    .returning('*');
};

const updateById = (id, vehicle) => {
  return knex('vehicles')
    .update(vehicle)
    .where({ id })
    .returning('*');
};

module.exports = {
  getAll,
  getById,
  getByDriverId,
  getByVehicleTypeId,
  add,
  deleteById,
  updateById
};
