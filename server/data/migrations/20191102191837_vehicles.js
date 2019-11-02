
exports.up = function(knex) {
  return knex.schema.createTable('vehicles', table => {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    table.string('name').notNullable();
    table.string('registrationPlate').notNullable();
    table.string('color').notNullable();
    table.uuid('vehicleTypeId').unsigned().index().references('id').inTable('vehicleTypes');
    table.string('photo').notNullable();
    table.string('techPassportUrl').notNullable();
    table.uuid('driverId').unsigned().index().references('id').inTable('drivers');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('vehicles');
};
