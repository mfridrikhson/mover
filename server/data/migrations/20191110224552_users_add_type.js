
exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.boolean('isDriver');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('isDriver');
  });
};
