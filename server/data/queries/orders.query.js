const knex = require('../db/connection');

const getAll = ({ driverId, customerId, status }) => {
  return knex('orders')
    .select('*')
    .where((builder) => {
      driverId ? builder.where({ driverId }) : null;
    })
    .where((builder) => {
      customerId ? builder.where({ customerId }) : null;
    })
    .where((builder) => {
      status ? builder.where({ status }) : null;
    });
};

const getById = id => {
  return knex('orders')
    .select('*')
    .where({ id })
    .first();
};

const add = order => {
  return knex('orders')
    .insert(order)
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
  add,
  updateById
};
