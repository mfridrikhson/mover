const supertest = require('supertest');

const app = require('../app');
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

  afterEach(async () => {
    await knex.raw('delete from orders');
  });

  afterAll(async () => {
    await knex.raw('truncate table users cascade');
    await knex.destroy();
  });

  describe('POST /api/orders', () => {
    it('should return added order and emit it to socket with customer', async (done) => {
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
        volumeWeight: 1,
        cargoType: 'Furniture',
        vehicleTypeId: vehicleTypes[0].id,
        fromPoint: {
          address: 'Point B',
          coords: {
            lat: 21.21,
            lng: 21.21
          }
        },
        toPoint: {
          address: 'Point A',
          coords: {
            lat: 12.12,
            lng: 12.12
          }
        },
        status: 'Pending'
      };

      const mockEmit = jest.fn();
      const mockTo = jest.fn(() => ({ emit: mockEmit }));
      app.context.io = { to: mockTo };

      request
        .post('/api/orders')
        .set('Authorization', `Bearer ${ resWithToken.body.token }`)
        .send(expectedData)
        .expect(201)
        .end((err, res) => {
          const emittedValue = mockEmit.mock.calls[0][1];

          expect(err).toBeNull();
          expect(res.body).toEqual(expect.objectContaining(expectedData));

          expect(mockEmit.mock.calls.length).toBe(1);
          expect(emittedValue).toEqual(expect.objectContaining({
            ...expectedData,
            customer: expect.objectContaining({
              firstName: 'Bob',
              lastName: 'Snow'
            })
          }));
          done();
        });
    });
  });
});
