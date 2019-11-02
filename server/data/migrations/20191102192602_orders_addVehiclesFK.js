
exports.up = function(knex) {
  return knex.schema.alterTable('orders', table => {
    table.uuid('vehicleId').unsigned().index()
      .references('id').inTable('vehicles').alter();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
