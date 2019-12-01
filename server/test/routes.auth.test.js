process.env.NODE_ENV = 'test';

const request = require('supertest');

const server = require('../server');

describe('routes : auth', () => {
  describe('POST /api/auth/register', () => {

    test('should return user and token', done => {
      request(server)
        .post('/api/auth/register')
        .send({
          email: 'user25@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack',
          lastName: 'London'
        })
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toEqual(201);
          expect(res.body).toHaveProperty(
            'token', 'user'
          );
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
          expect(res.status).toEqual(400);
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
          lastName: 'London'
        })
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toEqual(401);
          expect(res.text).toEqual('User with such email exists');
          done();
        });
    });
  });

  describe('POST /api/auth.login', () => {

    test('should return user and token', done => {
      request(server)
        .post('/api/auth/register')
        .send({
          email: 'user12@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow'
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
            expect(res.body).toHaveProperty(
              'user', 'token'
            );
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
          lastName: 'Snow'
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
});
