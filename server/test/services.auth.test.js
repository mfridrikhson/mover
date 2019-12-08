const knex = require('../data/db/connection');
const { login, register } = require('../api/services/auth.service');
const tokenHelper = require('../helpers/token.helper');

describe('services : auth', () => {

  afterAll(async () => {
    await knex.raw('truncate table users cascade');
    await knex.destroy();
  });

  describe('register', () => {

    it('should return user-customer and token', async (done) => {

      const userData = {
        email: 'test_register@gmail.com',
        password: 'test123456',
        firstName: 'Bob',
        lastName: 'Snow',
        isDriver: false
      };

      const { user, token } = await register(userData);

      const authorizedData = await tokenHelper.verifyToken(token);

      expect(authorizedData.id).toEqual(user.id);
      expect(user).toEqual(
        expect.objectContaining(userData),
      );
      done();
    });

    it('should return user-driver and token', async (done) => {

      const userData = {
        email: 'test_register_d@gmail.com',
        password: 'test123456',
        firstName: 'Bob',
        lastName: 'Snow',
        isDriver: true
      };

      const { user, token } = await register(userData);

      const authorizedData = await tokenHelper.verifyToken(token);

      expect(authorizedData.id).toEqual(user.id);
      expect(user).toEqual(
        expect.objectContaining(userData),
      );
      done();
    });

    it('should return logged in user-customer and token', async (done) => {

      const userData = {
        email: 'test_login@gmail.com',
        password: 'test123456',
        firstName: 'Bob',
        lastName: 'Snow',
        isDriver: false
      };

      const { user: registeredUser } = await register(userData);
      const { user, token } = await login(registeredUser);

      const authorizedData = await tokenHelper.verifyToken(token);

      expect(authorizedData.id).toEqual(user.id);
      expect(user).toEqual(
        expect.objectContaining(userData),
      );
      done();
    });

    it('should return logged in user-driver and token', async (done) => {

      const userData = {
        email: 'test_login_d@gmail.com',
        password: 'test123456',
        firstName: 'Bob',
        lastName: 'Snow',
        isDriver: false
      };

      const { user: registeredUser } = await register(userData);
      const { user, token } = await login(registeredUser);

      const authorizedData = await tokenHelper.verifyToken(token);

      expect(authorizedData.id).toEqual(user.id);
      expect(user).toEqual(
        expect.objectContaining(userData),
      );
      done();
    });
  });
});
