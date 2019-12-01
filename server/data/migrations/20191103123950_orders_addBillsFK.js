
exports.up = function(knex) {
  return knex.schema.alterTable('orders', table => {
    table.uuid('billId').unsigned().index()
      .references('id').inTable('bills').alter();
  });
};

exports.down = function(knex) {
  return knex.schema.table('orders', table => {
    table.dropIndex(['billId']);
    table.dropForeign(['billId']);
  });
};
