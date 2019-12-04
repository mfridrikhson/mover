
exports.up = function(knex) {
  return knex.schema.table('orders', table => {
    table.float('userRating');
    table.float('driverRating');
  });
};

exports.down = function(knex) {
  return knex.schema.table('orders', table => {
    table.dropColumn('userRating');
    table.dropColumn('driverRating');
  });
};
