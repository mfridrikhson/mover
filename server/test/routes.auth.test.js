const supertest = require('supertest');

const server = require('../app');

const request = supertest(server.callback());

const knex = require('../data/db/connection');

describe('routes : auth', () => {

  afterAll(async () =>{
    knex.destroy();
  });

  describe('POST /api/auth/register', () => {

    it('should return user and token', async () => {
      const res = await request
        .post('/api/auth/register')
        .send({
          email: 'user25@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack',
          lastName: 'London',
          isDriver: false
        });
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
    });

    it('should return an error if body is incomplete', async () => {
      const res = await request
        .post('/api/auth/register')
        .send({
          email: 'user26@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack'
        });
      expect(res.status).toEqual(500);
    });

    it('should return an error if user already exist', async () => {
      const res = await request
        .post('/api/auth/register')
        .send({
          email: 'user25@gmail.com',
          password: 'asdqqwerfg',
          firstName: 'Jack',
          lastName: 'London',
          isDriver: false
        });
      expect(res.status).toEqual(401);
      expect(res.text).toEqual('User with such email exists');
    });
  });

  describe('POST /api/auth/login', () => {

    it('should return user and token', async () => {
      await request
        .post('/api/auth/register')
        .send({
          email: 'user12@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow',
          isDriver: false
        });
      const res = await request
        .post('/api/auth/login')
        .send({
          email: 'user12@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow'
        });
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('token');
    });


    it('should return an error if passwords do not match', async () => {
      await request
        .post('/api/auth/register')
        .send({
          email: 'user13@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow',
          isDriver: false
        });
      const res = await request
        .post('/api/auth/login')
        .send({
          email: 'user13@gmail.com',
          password: 'asdqwertyf',
          firstName: 'Bob',
          lastName: 'Snow'
        });
      expect(res.status).toEqual(401);
      expect(res.text).toEqual('Passwords do not match.');
    });


    it('should return an error if such user is not registered', async () => {
      const res = await request
        .post('/api/auth/login')
        .send({
          email: 'user14@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow'
        });
      expect(res.status).toEqual(401);
      expect(res.text).toEqual('Incorrect email.');
    });
  });


  describe('GET /api/auth/user', () => {

    it('should return user', async () => {
      await request
        .post('/api/auth/register')
        .send({
          email: 'user15@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow',
          isDriver: false
        });
      const response = await request
        .post('/api/auth/login')
        .send({
          email: 'user15@gmail.com',
          password: 'asdqwertyfg',
          firstName: 'Bob',
          lastName: 'Snow',
        });

      const res = await request
        .get('/api/auth/user')
        .set('Authorization', `Bearer ${ response.body.token }`);
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('user');
    })
    ;

    it('should return an error if token is not passed', async () => {
      const res = await request
        .get('/api/auth/user');
      expect(res.status).toEqual(401);
      expect(res.text).toEqual('Invalid token');
    });
  });
});

