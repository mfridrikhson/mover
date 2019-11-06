
exports.up = function(knex) {
  return knex.schema.createTable('vehicleTypes', table => {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    table.string('type').notNullable();
    table.float('pricePerKm').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('vehicleTypes');
};
