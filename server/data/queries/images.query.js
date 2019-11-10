const knex = require('../db/connection');

const getById = id => {
  return knex('images')
    .select('*')
    .where({ id })
    .first();
};

const add = image => {
  return knex('images')
    .insert(image)
    .returning('*');
};

module.exports = { getById, add };
