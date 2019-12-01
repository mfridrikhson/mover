
exports.up = function(knex) {
  return knex.schema.alterTable('orders', table => {
    table.uuid('vehicleId').unsigned().index()
      .references('id').inTable('vehicles').alter();
  });
};

exports.down = function(knex) {
  return knex.schema.table('orders', table => {
    table.dropIndex(['vehicleId']);
    table.dropForeign(['vehicleId']);
  });
};
