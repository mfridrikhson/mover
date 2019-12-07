const knex = require('../db/connection');

const add = orderRoute => {
  return knex('orderRoutes')
    .insert(orderRoute)
    .returning('*');
};

module.exports = {
  add,
};
