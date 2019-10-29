exports.up = function(knex) {
  return knex.schema.createTable('orders', table => {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    table.float('volumeWeight');
    table.uuid('vehicleTypeId').notNullable();
    table.string('fromPointAddress').notNullable();
    table.float('fromPointLat').notNullable();
    table.float('fromPointLng').notNullable();
    table.string('toPointAddress').notNullable();
    table.float('toPointLat').notNullable();
    table.float('toPointLng').notNullable();
    table.string('status');
    table.uuid('driverId').notNullable();
    table.uuid('customerId').unsigned().index().references('id').inTable('users');
    table.uuid('vehicleId').notNullable();
    table.uuid('billId').notNullable();
    table.dateTime('createdAt').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
