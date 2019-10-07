exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.float('rating');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users');
};
