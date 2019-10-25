const knex = require('../db/connection');

const getAll = () => {
  return knex('orders')
    .select('*');
};

const getById = id => {
  return knex('orders')
    .select('*')
    .where({ id })
    .first();
};

const getByDriverId = driverId => {
  return knex('orders')
    .select('*')
    .where({ driverId });
};

const getByCustomerId  = customerId => {
  return knex('orders')
    .select('*')
    .where({ customerId });
};

const getByStatus = status => {
  return knex('users')
    .select('*')
    .where({ status });
};

const add = order => {
  return knex('orders')
    .insert(order)
    .returning('*');
};

const deleteById = id => {
  return knex('orders')
    .del()
    .where({ id })
    .returning('*');
};

const updateById = (id, order) => {
  return knex('orders')
    .update(order)
    .where({ id })
    .returning('*');
};


module.exports = {
  getAll,
  getById,
  getByDriverId,
  getByCustomerId,
  getByStatus,
  add,
  deleteById,
  updateById
};
