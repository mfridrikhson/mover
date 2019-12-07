const supertest = require('supertest');

const server = require('../app');
const knex = require('../data/db/connection');
const request = supertest(server.callback());

describe('routes : vehicles', () => {
  beforeAll(async () => {
    await request
      .post('/api/auth/register')
      .send({
        email: 'test@gmail.com',
        password: 'test123456',
        firstName: 'Bob',
        lastName: 'Snow',
        isDriver: true
      });
  });

  afterEach(async () => {
    await knex.raw('delete from vehicles');
  });

  afterAll(async () => {
    await knex.raw('truncate table users cascade');
    await knex.destroy();
  });

  describe('POST /api/vehicles', () => {
    it('should return added vehicle', async (done) => {
      const resWithToken = await request
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'test123456'
        });
      const { body: vehicleTypes } = await request
        .get('/api/vehicle-types')
        .set('Authorization', `Bearer ${ resWithToken.body.token }`);
      const expectedData = {
        name: 'Daewoo Lanos',
        registrationPlate: 'АА 1234 АН',
        color: '#000000',
        vehicleTypeId: vehicleTypes[0].id,
        photoUrl: 'http://some.url',
        techPassportUrl: 'http://some.url',
        driverId: resWithToken.body.driver.id
      };

      request
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${ resWithToken.body.token }`)
        .send(expectedData)
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body).toEqual(expect.arrayContaining(
            [expect.objectContaining(expectedData)]
          ));
          done();
        });
    });
  });

  describe('GET /api/vehicles', () => {
    it('should return all driver\'s vehicles', async (done) => {
      const resWithToken = await request
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'test123456'
        });
      const { body: vehicleTypes } = await request
        .get('/api/vehicle-types')
        .set('Authorization', `Bearer ${ resWithToken.body.token }`);
      const expectedData = [
        {
          name: 'Daewoo Lanos',
          registrationPlate: 'АА 1234 АН',
          color: '#000000',
          vehicleTypeId: vehicleTypes[0].id,
          photoUrl: 'http://some.url',
          techPassportUrl: 'http://some.url',
          driverId: resWithToken.body.driver.id
        },
        {
          name: 'Chevrolet Aveo',
          registrationPlate: 'АА 5678 АН',
          color: '#111111',
          vehicleTypeId: vehicleTypes[1].id,
          photoUrl: 'http://some.url',
          techPassportUrl: 'http://some.url',
          driverId: resWithToken.body.driver.id
        }
      ];

      await Promise.all(expectedData.map((vehicle) => request
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${ resWithToken.body.token }`)
        .send(vehicle)
      ));

      request
        .get(`/api/vehicles/driver/${resWithToken.body.driver.id}`)
        .set('Authorization', `Bearer ${ resWithToken.body.token }`)
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body).toEqual(
            expect.arrayContaining(
              expectedData.map(obj => expect.objectContaining(obj))
            )
          );
          done();
        });
    });
  });
});
