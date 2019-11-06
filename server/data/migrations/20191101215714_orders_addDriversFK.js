
exports.up = function(knex) {
  return knex.schema.alterTable('orders', table => {
    table.uuid('driverId').unsigned().index().references('id').inTable('drivers').alter();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
