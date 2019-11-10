exports.seed = knex => knex('vehicleTypes').del()
  .then(() => knex('vehicleTypes').insert([
    { id: knex.raw('gen_random_uuid()'), type: 'Minivan', pricePerKm: 2.5 },
    { id: knex.raw('gen_random_uuid()'), type: 'Van', pricePerKm: 5 },
    { id: knex.raw('gen_random_uuid()'), type: '3-Ton truck', pricePerKm: 10 },
    { id: knex.raw('gen_random_uuid()'), type: '5-Ton truck', pricePerKm: 15 }
  ]));
