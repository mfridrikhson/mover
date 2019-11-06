
exports.up = function(knex) {
  return knex.schema.alterTable('orders', table => {
    table.uuid('vehicleTypeId').unsigned().index()
      .references('id').inTable('vehicleTypes').alter();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
