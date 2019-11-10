
exports.up = function(knex) {
  return knex.schema.alterTable('users', table => {
    table.boolean('isDriver').notNullable().alter();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
