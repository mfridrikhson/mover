
exports.up = function(knex) {
  return knex.schema.alterTable('orders', table => {
    table.uuid('billId').unsigned().index()
      .references('id').inTable('bills').alter();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
