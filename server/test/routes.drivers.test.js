const supertest = require('supertest');
const { app } = require('../app');
const request = supertest(app.callback());
const knex = require('../data/db/connection');

describe('routes : drivers', () => {

  beforeAll(() => {
    return request
      .post('/api/auth/register')
      .send({
        email: 'test_driver@gmail.com',
        password: 'test123456',
        firstName: 'Bob',
        lastName: 'Snow',
        isDriver: true
      });
  });

  afterAll(async () => {
    await knex.raw('truncate table users cascade');
    await knex.destroy();
  });

  describe('PUT /api/drivers/:id', () => {

    it('should return driver that was updated', async (done) => {
      const resWithToken = await request
        .post('/api/auth/login')
        .send({
          email: 'test_driver@gmail.com',
          password: 'test123456'
        });

      const driver = await knex('drivers').select('*').where({ userId: resWithToken.body.user.id }).first();

      request
        .put(`/api/drivers/${ driver.id }`)
        .set('Authorization', `Bearer ${ resWithToken.body.token }`)
        .send({
          driverLicenseUrl: 'driver.license123asd'
        })
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.driverLicenseUrl).toEqual('driver.license123asd');
          done();
        });
    });

    it('should return an error if wrong data type for field is passed', async (done) => {
      const resWithToken = await request
        .post('/api/auth/login')
        .send({
          email: 'test_driver@gmail.com',
          password: 'test123456'
        });

      const driver = await request
        .get(`/api/drivers/userId/${ resWithToken.body.id }`)
        .set('Authorization', `Bearer ${ resWithToken.body.token }`);

      request
        .put(`/api/drivers/${ driver.id }`)
        .set('Authorization', `Bearer ${ resWithToken.body.token }`)
        .send({
          driverLicenseUrl: undefined
        })
        .expect(500)
        .end((err) => {
          expect(err).toBeNull();
          done();
        });
    });

    it('should return an error if driver with such id doesn`t exist', async (done) => {
      const resWithToken = await request
        .post('/api/auth/login')
        .send({
          email: 'test_driver@gmail.com',
          password: 'test123456'
        });
      request
        .put(`/api/drivers/123`)
        .set('Authorization', `Bearer ${ resWithToken.body.token }`)
        .send({
          driverLicenseUrl: 'driver.license123asd'
        })
        .expect(500)
        .end((err) => {
          expect(err).toBeNull();
          done();
        });
    });
  });
});

