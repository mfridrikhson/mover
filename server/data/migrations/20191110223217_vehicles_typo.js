
exports.up = function(knex) {
  return knex.schema.alterTable('vehicles', table => {
    table.renameColumn('photo', 'photoUrl');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('vehicles');
};

