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

  afterAll(() => {
    return knex.destroy();
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
        .get('/api/vehicle-types');

      request
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${ resWithToken.body.token }`)
        .send({
          name: 'Daewoo Lanos',
          registrationPlate: 'АА 12345 АН',
          color: '#000000',
          vehicleTypeId: vehicleTypes[0].id,
          photoUrl: 'http://some.url',
          techPassportUrl: 'http://some.url',
          driverId: resWithToken.body.driver.id
        })
        .expect(201)
        .end((err, res) => {
          console.log(res.body);
          expect(err).toBeNull();
          /*expect(res.body).toEqual(

          );*/
          done();
        });
    });
  });

  describe('GET /api/vehicles', () => {
    it('should return all vehicle types', async (done) => {
      const resWithToken = await request
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'test123456'
        });

      request
        .get('/api/vehicle-types')
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
