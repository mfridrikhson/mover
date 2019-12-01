
exports.up = function(knex) {
  return knex.schema.table('orders', table => {
    table.string('cargoType');
  });
};

exports.down = function(knex) {
  return knex.schema.table('orders', table => {
    table.dropColumn('cargoType');
  });
};
