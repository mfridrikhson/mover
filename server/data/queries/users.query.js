const knex = require('../db/connection');

const getAll = () => {
  return knex('users')
    .select('*');
};

const getById = id => {
  return knex('users')
    .select('*')
    .where({ id })
    .first();
};

const getByEmail = email => {
  return knex('users')
    .select('*')
    .where({ email })
    .first();
};

const add = user => {
  return knex('users')
    .insert(user)
    .returning('*');
};

const updateById = (id, user) => {
  return knex('users')
    .update(user)
    .where({ id })
    .returning('*');
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  add,
  updateById
};
