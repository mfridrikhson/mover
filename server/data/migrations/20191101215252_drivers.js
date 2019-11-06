
exports.up = function(knex) {
  return knex.schema.createTable('drivers', table => {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    table.uuid('userId').unsigned().index().references('id').inTable('users');
    table.uuid('currentVehicleId').notNullable();
    table.string('driverLicenseUrl').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('drivers');
};
