const supertest = require('supertest');

const { app } = require('../app');
const knex = require('../data/db/connection');
const request = supertest(app.callback());

describe('routes : vehicles', () => {
  beforeAll(async () => {
    await request
      .post('/api/auth/register')
      .send({
        email: 'test@gmail.com',
        password: 'test123456',
        firstName: 'Bob',
        lastName: 'Snow',
        isDriver: false
      });
  });

  afterAll(() => {
    return knex.destroy();
  });

  describe('GET /api/vehicle-types', () => {
    it('should return all vehicle types', async (done) => {
      const resWithToken = await request
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'test123456'
        });
      const expectedData = [
        {
          "type":"Minivan",
          "pricePerKm": 2.5
        },
        {
          "type":"Van",
          "pricePerKm": 5
        },
        {
          "type":"3-Ton truck",
          "pricePerKm": 10
        },
        {
          "type":"5-Ton truck",
          "pricePerKm": 15
        }
      ];

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
