exports.up = function(knex) {
  return knex.schema.createTable('images', table => {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    table.string('link').notNullable();
    table.string('deleteHash').notNullable();
    table.dateTime('createdAt').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('images');
};
