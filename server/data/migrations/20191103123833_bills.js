
exports.up = function(knex) {
  return knex.schema.createTable('bills', table => {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    table.float('cost').notNullable();
    table.string('status').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('bills');
};
