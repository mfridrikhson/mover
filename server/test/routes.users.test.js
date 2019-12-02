const request = require('supertest');

const server = require('../server');

beforeAll(async () => {
  await request(server)
    .post('/api/auth/register')
    .send({
      email: 'test@gmail.com',
      password: 'test123456',
      firstName: 'Bob',
      lastName: 'Snow',
      isDriver: false
    })
});

afterEach(() => {
  server.close();
});

describe('routes : users', () => {

  describe('PUT /api/users/:id', () => {

    test('should return user that was updated', done => {
      request(server)
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'test123456'
        })
        .end((err, res) => {
          request(server)
            .put(`/api/users/${ res.body.user.id }`)
            .set('Authorization', `Bearer ${ res.body.token }`)
            .send({
              lastName: 'Wazowski',
            })
            .end((err, res) => {
              console.log(res.body);
              expect(err).toBeNull();
              expect(res.status).toEqual(200);
              expect(res.body.email).toEqual('test@gmail.com');
              expect(res.body.firstName).toEqual('Bob');
              expect(res.body.lastName).toEqual('Wazowski');
              expect(res.body.isDriver).toEqual(false);
              done();
            });
        });
    });

    test('should return an error if wrong data type for field is passed', done => {
      request(server)
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'test123456'
        })
        .end((err, res) => {
          request(server)
            .put(`/api/users/${ res.body.user.id }`)
            .set('Authorization', `Bearer ${ res.body.token }`)
            .send({
              lastName: 123
            })
            .end((err, res) => {
              console.log(res.body);
              expect(err).toBeNull();
              expect(res.status).toEqual(200);
              done();
            });
        });
    });

    test('should return an error if user with such id doesn`t exist', done => {
      request(server)
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'test123456'
        })
        .end((err, res) => {
          request(server)
            .put(`/api/users/123`)
            .set('Authorization', `Bearer ${ res.body.token }`)
            .send({
              lastName: 'Wazowski'
            })
            .end((err, res) => {
              console.log(res.body);
              expect(err).toBeNull();
              expect(res.status).toEqual(500);
              done();
            });
        });
    });
  });
});
