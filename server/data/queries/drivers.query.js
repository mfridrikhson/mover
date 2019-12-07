const knex = require('../db/connection');

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

const add = driver => {
  return knex('drivers')
    .insert(driver)
    .returning('*');
};

const updateById = (id, driver) => {
  return knex('drivers')
    .update(driver)
    .where({ id })
    .returning('*');
};

module.exports = {
  getById,
  getByUserId,
  add,
  updateById
};
