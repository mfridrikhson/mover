
exports.up = function(knex) {
  return knex.schema.alterTable('orders', table => {
    table.uuid('billId').unsigned().nullable().alter();
    table.uuid('vehicleId').unsigned().nullable().alter();
    table.uuid('driverId').unsigned().nullable().alter();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
