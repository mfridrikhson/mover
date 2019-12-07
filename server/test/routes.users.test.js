const supertest = require('supertest');
const app = require('../app');
const request = supertest(app.callback());
const knex = require('../data/db/connection');

describe('routes : users', () => {

  beforeAll(() => {
    return request
      .post('/api/auth/register')
      .send({
        email: 'test@gmail.com',
        password: 'test123456',
        firstName: 'Bob',
        lastName: 'Snow',
        isDriver: false
      });
  });

  afterAll(async () => {
    await knex.raw('truncate table users cascade');
    await knex.destroy();
  });

  describe('PUT /api/users/:id', () => {

    it('should return user that was updated', async (done) => {
      const resWithToken = await request
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'test123456'
        });
      request
        .put(`/api/users/${ resWithToken.body.user.id }`)
        .set('Authorization', `Bearer ${ resWithToken.body.token }`)
        .send({
          lastName: 'Wazowski',
        })
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.email).toEqual('test@gmail.com');
          expect(res.body.firstName).toEqual('Bob');
          expect(res.body.lastName).toEqual('Wazowski');
          expect(res.body.isDriver).toEqual(false);
          done();
        });
    });

    it('should return an error if wrong data type for field is passed', async (done) => {
      const resWithToken = await request
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'test123456'
        });
      request
        .put(`/api/users/${ resWithToken.body.user.id }`)
        .set('Authorization', `Bearer ${ resWithToken.body.token }`)
        .send({
          lastName: undefined
        })
        .expect(500)
        .end((err) => {
          expect(err).toBeNull();
          done();
        });
    });

    it('should return an error if user with such id doesn`t exist', async (done) => {
      const resWithToken = await request
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'test123456'
        });
      request
        .put(`/api/users/123`)
        .set('Authorization', `Bearer ${ resWithToken.body.token }`)
        .send({
          lastName: 'Wazowski'
        })
        .expect(500)
        .end((err) => {
          expect(err).toBeNull();
          done();
        });
    });
  });
});

