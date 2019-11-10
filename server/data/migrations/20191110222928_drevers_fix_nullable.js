
exports.up = function(knex) {
  return knex.schema.alterTable('drivers', table => {
    table.uuid('currentVehicleId').unsigned().nullable().alter();
    table.string('driverLicenseUrl').nullable().alter();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('drivers');
};

