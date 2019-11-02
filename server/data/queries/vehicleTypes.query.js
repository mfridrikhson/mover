const knex = require('../db/connection');

const getAll = () => {
  return knex('vehicleTypes')
    .select('*');
};

const getById = id => {
  return knex('vehicleTypes')
    .select('*')
    .where({ id })
    .first();
};

const add = vehicleType => {
  return knex('vehicleTypes')
    .insert(vehicleType)
    .returning('*');
};

const deleteById = id => {
  return knex('vehicleTypes')
    .del()
    .where({ id })
    .returning('*');
};

const updateById = (id, vehicleType) => {
  return knex('vehicleTypes')
    .update(vehicleType)
    .where({ id })
    .returning('*');
};

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById
};
