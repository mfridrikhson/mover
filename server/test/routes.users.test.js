const supertest = require('supertest');
const server = require('../app');
const request = supertest(server.callback());
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

  afterAll(() => {
    return knex.destroy();
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
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
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
          lastName: 123
        })
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
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
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toEqual(500);
          done();
        });
    });
  });
});

