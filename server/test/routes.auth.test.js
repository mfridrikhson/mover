const request = require('supertest');

const server = require('../server');
const knex = require('../data/db/connection');

beforeEach(() => {
  return knex.migrate.rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex.seed.run();
    });
});

describe('routes : auth', () => {
  describe('POST /api/auth/register', () => {

    test('should return user and token', done => {
      request(server)
        .post('/api/auth/register')
        .send({
          email: 'user25@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack',
          lastName: 'London',
          isDriver: false
        })
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toEqual(201);
          expect(res.body).toHaveProperty('token');
          expect(res.body).toHaveProperty('user');
          done();
        });
    });

    test('should return an error if body is incomplete', done => {
      request(server)
        .post('/api/auth/register')
        .send({
          email: 'user25@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack'
        })
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toEqual(500);
          done();
        });
    });

    test('should return an error if user already exist', done => {
      request(server)
        .post('/api/auth/register')
        .send({
          email: 'user1@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack',
          lastName: 'London',
          isDriver: false
        })
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toEqual(401);
          expect(res.text).toEqual('User with such email exists');
          done();
        });
    });
  });

  describe('POST /api/auth/login', () => {

    test('should return user and token', done => {
      request(server)
        .post('/api/auth/register')
        .send({
          email: 'user12@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow',
          isDriver: false
        }).end(() => {
        request(server)
          .post('/api/auth/login')
          .send({
            email: 'user12@gmail.com',
            password: 'asdqwertyfg',
            firstName: 'Bob',
            lastName: 'Snow'
          })
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('user');
            expect(res.body).toHaveProperty('token');
            done();
          })
      });
    });

    test('should return an error if passwords do not match', done => {
      request(server)
        .post('/api/auth/register')
        .send({
          email: 'user12@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow',
          isDriver: false
        }).end(() => {
        request(server)
          .post('/api/auth/login')
          .send({
            email: 'user12@gmail.com',
            password: 'asdqwertyf',
            firstName: 'Bob',
            lastName: 'Snow'
          })
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.status).toEqual(401);
            expect(res.text).toEqual('Passwords do not match.');
            done();
          })
      });
    });

    test('should return an error if such user is not registered', done => {
      request(server)
        .post('/api/auth/login')
        .send({
          email: 'user12@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow'
        })
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toEqual(401);
          expect(res.text).toEqual('Incorrect email.');
          done();
        });
    });

  });

  describe('GET /api/auth/user', () => {

    test('should return user', done => {
      request(server)
        .post('/api/auth/register')
        .send({
          email: 'user11@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow',
          isDriver: false
        })
        .end(() => {
          request(server)
            .post('/api/auth/login')
            .send({
              email: 'user11@gmail.com',
              password: 'asdqwertyfg',
              firstName: 'Bob',
              lastName: 'Snow',
            })
            .end((err, res) => {
              request(server)
                .get('/api/auth/user')
                .set('Authorization', `Bearer ${ res.body.token }`)
                .end((err, res) => {
                  expect(err).toBeNull();
                  expect(res.status).toEqual(200);
                  expect(res.body).toHaveProperty('user');
                  done();
                });
            });
        });
    });

    test('should return an error if token is not passed', done => {
      request(server)
        .get('/api/auth/user')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toEqual(401);
          expect(res.text).toEqual('Invalid token');
          done();
        })
    })

  });
});
