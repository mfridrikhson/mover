const knex = require('../db/connection');

const getAll = () => {
  return knex('drivers')
    .select('*');
};

const getById = id => {
  return knex('drivers')
    .select('*')
    .where({ id })
    .first();
};

const getByUserId = userId => {
  return knex('drivers')
    .select('*')
    .where({ userId })
    .first();
};

const getByCurrentVehicleId = currentVehicleId => {
  return knex('drivers')
    .select('*')
    .where({ currentVehicleId })
    .first();
};

const add = driver => {
  return knex('drivers')
    .insert(driver)
    .returning('*');
};

const deleteById = id => {
  return knex('drivers')
    .del()
    .where({ id })
    .returning('*');
};

const updateById = (id, driver) => {
  return knex('drivers')
    .update(driver)
    .where({ id })
    .returning('*');
};

module.exports = {
  getAll,
  getById,
  getByUserId,
  getByCurrentVehicleId,
  add,
  deleteById,
  updateById
};
