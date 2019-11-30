process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server');
const knex = require('../data/db/connection');
const { createToken } = require('../helpers/token.helper');

//TODO add proper error checks (unathorized vs all other)
describe('routes : users', () => {

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

  describe('GET /api/users', () => {
    it('should return all users', done => {
      knex('users')
        .select('*')
        .then(users => {
          const user = users[0];
          const token = createToken({ id: user.id, email: user.email });
          chai.request(server)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.length.should.eql(3);
              res.body[0].should.include.keys(
                'id', 'email', 'password', 'firstName', 'lastName', 'rating'
              );
              done();
            });
        });
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user where id = aeb77984-bd08-4489-85fc-d5fface23a78', done => {
      knex('users')
        .select('*')
        .then(users => {
          const user = users[0];
          const token = createToken({ id: user.id, email: user.email });

          chai.request(server)
            .get('/api/users/aeb77984-bd08-4489-85fc-d5fface23a78')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.should.include.keys(
                'id', 'email', 'password', 'firstName', 'lastName', 'rating'
              );
              res.body.id.should.equal('aeb77984-bd08-4489-85fc-d5fface23a78');
              done();
            });
        });
    });


    it('should throw an error if user does not exist', done => {
      chai.request(server)
        .get('api/users/123')
        .end((err) => {
          should.exist(err);
          done();
        });
    });
  });

  describe('POST /api/users', () => {
    it('should return the user that was added', done => {
      knex('users')
        .select('*')
        .then(users => {
          const user = users[0];
          const token = createToken({ id: user.id, email: user.email });

          chai.request(server)
            .post('/api/users')
            .set('Authorization', `Bearer ${ token }`)
            .send({
              email: 'user4@gmail.com',
              password: 'asdqqwerfg',
              firstName: 'Jack',
              lastName: 'London',
              rating: 9.5
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(201);
              res.type.should.equal('application/json');
              res.body.should.include.keys(
                'id', 'email', 'password', 'firstName', 'lastName', 'rating'
              );
              done();
            });
        });
    });

    it('should return an error if a body is incorrect', done => {
      knex('users')
        .select('*')
        .then(users => {
          const user = users[0];
          const token = createToken({ id: user.id, email: user.email });

          chai.request(server)
            .post('/api/users')
            .set('Authorization', `Bearer ${ token }`)
            .send({
              email: 'user4@gmail.com',
              password: 'asdqqwerfg'
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(400);
              done();
            });
        });
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should return user that was deleted', done => {
      knex('users')
        .select('*')
        .then(users => {
          const user = users[0];
          const token = createToken({ id: user.id, email: user.email });
          const usersLengthBeforeDelete = users.length;
          chai.request(server)
            .delete(`/api/users/${user.id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.should.include.keys(
                'id', 'email', 'password', 'firstName', 'lastName', 'rating'
              );
              knex('users').select('*')
                .then(updatedUsers => {
                  updatedUsers.length.should.equal(usersLengthBeforeDelete - 1);
                  done();
                });
            });
        });
    });

    it('should return an error if user with such id doesn`t exist', done => {
      knex('users')
        .select('*')
        .then(users => {
          const user = users[0];
          const token = createToken({ id: user.id, email: user.email });
          chai.request(server)
            .delete('/api/users/123')
            .set('Authorization', `Bearer ${ token }`)
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(400);
              done();
            });
        });
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should return the movie that was updated', done => {
      knex('users')
        .select('*')
        .then(users => {
          const user = users[0];
          const token = createToken({ id: user.id, email: user.email });
          chai.request(server)
            .put(`/api/users/${user.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              rating: 10
            })
            .end((err,res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.should.include.keys(
                'id', 'email', 'password', 'firstName', 'lastName', 'rating'
              );

              const updatedUser = res.body;
              updatedUser.rating.should.not.be.equal(user.rating);
              done();
            });
        });
    });

    it('should return an error if user with such id doesn`t exist', done => {
      knex('users')
        .select('*')
        .then(users => {
          const user = users[0];
          const token = createToken({ id: user.id, email: user.email });
          chai.request(server)
            .put('/api/users/123')
            .set('Authorization', `Bearer ${ token }`)
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(400);
              done()
            })
        });
    })
  });

});



