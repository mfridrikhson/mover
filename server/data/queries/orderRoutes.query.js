const knex = require('../db/connection');

const getAll = () => {
  return knex('orderRoutes')
    .select('*');
};

const getById = id => {
  return knex('orderRoutes')
    .select('*')
    .where({ id })
    .first();
};

const getByOrderId = orderId => {
  return knex('orderRoutes')
    .select('*')
    .where({ orderId });
};

const add = orderRoute => {
  return knex('orderRoutes')
    .insert(orderRoute)
    .returning('*');
};

const deleteById = id => {
  return knex('orderRoutes')
    .del()
    .where({ id })
    .returning('*');
};

const updateById = (id, orderRoute) => {
  return knex('orderRoutes')
    .update(orderRoute)
    .where({ id })
    .returning('*');
};

module.exports = {
  getAll,
  getById,
  getByOrderId,
  add,
  deleteById,
  updateById
};
