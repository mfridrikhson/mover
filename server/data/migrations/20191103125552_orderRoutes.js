
exports.up = function(knex) {
  return knex.schema.createTable('orderRoutes', table => {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    table.uuid('orderId').unsigned().index().references('id').inTable('orders');
    table.float('lat').notNullable();
    table.float('lng').notNullable();
    table.dateTime('createdAt').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orderRoutes');
};
