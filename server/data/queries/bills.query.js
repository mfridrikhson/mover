const knex = require('../db/connection');

const getAll = () => {
  return knex('bills')
    .select('*');
};

const getById = id => {
  return knex('bills')
    .select('*')
    .where({ id })
    .first();
};

const add = bill => {
  return knex('bills')
    .insert(bill)
    .returning('*');
};

const deleteById = id => {
  return knex('bills')
    .del()
    .where({ id })
    .returning('*');
};

const updateById = (id, bill) => {
  return knex('bills')
    .update(bill)
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
