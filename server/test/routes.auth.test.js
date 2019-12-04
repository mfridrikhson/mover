const supertest = require('supertest');
const server = require('../app');
const request = supertest(server.callback());
const knex = require('../data/db/connection');

describe('routes : auth', () => {

  afterAll(() => {
    return knex.destroy();
  });

  describe('POST /api/auth/register', () => {

    it('should return user and token', async (done) => {
      request
        .post('/api/auth/register')
        .send({
          email: 'user25@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack',
          lastName: 'London',
          isDriver: false
        }).end((err, res) => {
        expect(err).toBeNull();
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('user');
        done();
      });
    });

    it('should return an error if body is incomplete', async (done) => {
      request
        .post('/api/auth/register')
        .send({
          email: 'user26@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack'
        }).end((err, res) => {
        expect(err).toBeNull();
        expect(res.status).toEqual(500);
        done();
      });
    });

    it('should return an error if user already exist', async (done) => {
      request
        .post('/api/auth/register')
        .send({
          email: 'user25@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack',
          lastName: 'London',
          isDriver: false
        }).end((err, res) => {
        expect(err).toBeNull();
        expect(res.status).toEqual(401);
        expect(res.text).toEqual('User with such email exists');
        done();
      });
    });
  });

  describe('POST /api/auth/login', () => {

    it('should return user and token', async (done) => {
      await request
        .post('/api/auth/register')
        .send({
          email: 'user12@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow',
          isDriver: false
        });
      request
        .post('/api/auth/login')
        .send({
          email: 'user12@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow'
        }).end((err, res) => {
        expect(err).toBeNull();
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body).toHaveProperty('token');
        done();
      });
    });


    it('should return an error if passwords do not match', async (done) => {
      await request
        .post('/api/auth/register')
        .send({
          email: 'user13@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow',
          isDriver: false
        });
      request
        .post('/api/auth/login')
        .send({
          email: 'user13@gmail.com',
          password: 'asdqwertyf',
          firstName: 'Bob',
          lastName: 'Snow'
        }).end((err, res) => {
        expect(err).toBeNull();
        expect(res.status).toEqual(401);
        expect(res.text).toEqual('Passwords do not match.');
        done();
      });
    });


    it('should return an error if such user is not registered', async (done) => {
      request
        .post('/api/auth/login')
        .send({
          email: 'user14@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow'
        }).end((err, res) => {
        expect(err).toBeNull();
        expect(res.status).toEqual(401);
        expect(res.text).toEqual('Incorrect email.');
        done();
      });
    });
  });


  describe('GET /api/auth/user', () => {

    it('should return user', async (done) => {
      await request
        .post('/api/auth/register')
        .send({
          email: 'user15@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow',
          isDriver: false
        });

      const resWithToken = await request
        .post('/api/auth/login')
        .send({
          email: 'user15@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow',
        });

      request
        .get('/api/auth/user')
        .set('Authorization', `Bearer ${ resWithToken.body.token }`)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('user');
          done();
        });
    });

    it('should return an error if token is not passed', async (done) => {
      request
        .get('/api/auth/user')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toEqual(401);
          expect(res.text).toEqual('Invalid token');
          done();
        });
    });
  });
});
