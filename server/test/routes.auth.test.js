process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server');
const knex = require('../data/db/connection');

describe('routes : auth', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => {
        return knex.migrate.latest();
      })
      .then(() => {
        return knex.seed.run();
      });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('POST /api/auth/register', () => {

    it('should return user and token', done => {
      chai.request(server)
        .post('/api/auth/register')
        .send({
          email: 'user25@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack',
          lastName: 'London'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.body.should.include.keys(
            'token', 'user'
          );
          done();
        });
    });

    it('should return an error if body is incomplete', done => {
      chai.request(server)
        .post('/api/auth/register')
        .send({
          email: 'user25@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(400);
          done();
        });
    });

    it('should return an error if user already exist', done => {
      chai.request(server)
        .post('/api/auth/register')
        .send({
          email: 'user1@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack',
          lastName: 'London'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(401);
          res.text.should.equal('User with such email exists');
          done();
        });
    });
  });

  describe('POST /api/auth.login', () => {

    it('should return user and token', done => {
      chai.request(server)
        .post('/api/auth/register')
        .send({
          email: 'user12@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow'
        }).end(() => {
        chai.request(server)
          .post('/api/auth/login')
          .send({
            email: 'user12@gmail.com',
            password: 'asdqwertyfg',
            firstName: 'Bob',
            lastName: 'Snow'
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.body.should.include.keys(
              'user', 'token'
            );
            done();
          })
      });
    });

    it('should return an error if passwords do not match', done => {
      chai.request(server)
        .post('/api/auth/register')
        .send({
          email: 'user12@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow'
        }).end(() => {
        chai.request(server)
          .post('/api/auth/login')
          .send({
            email: 'user12@gmail.com',
            password: 'asdqwertyf',
            firstName: 'Bob',
            lastName: 'Snow'
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(401);
            res.text.should.equal('Passwords do not match.');
            done();
          })
      });
    });

    it('should return an error if such user is not registered', done => {
      chai.request(server)
        .post('/api/auth/login')
        .send({
          email: 'user12@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow'
        }).end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(401);
          res.text.should.equal('Incorrect email.');
          done();
      });
    });

  });
});
