const knex = require('../db/connection');

const getAll = async () => {
  return knex('users')
    .select('*');
};

const getById = async (id) => {
  return knex('users')
    .select('*')
    .where({ id: id });
};

const add = async (user) =>{
  return knex('users')
    .insert(user)
    .returning('*');
};

const deleteById = async (id) => {
  return knex('users')
    .del()
    .where({ id: id})
    .returning('*');
};

const updateById = async (id, user) => {
  return knex('users')
    .update(user)
    .where({ id : id})
    .returning('*');
};

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById
};
