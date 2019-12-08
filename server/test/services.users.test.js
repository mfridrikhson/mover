const knex = require('../data/db/connection');
const { getUserById, addUser } = require('../api/services/users.service');

describe('services : users', () => {

  beforeAll(async () => {
    await addUser({
      email: 'testC@gmail.com',
      password: 'test123456',
      firstName: 'Bob',
      lastName: 'Snow',
      isDriver: false
    });
    await addUser({
      email: 'testD@gmail.com',
      password: 'test123456',
      firstName: 'Bob',
      lastName: 'Snow',
      isDriver: true
    });
  });

  afterAll(async () => {
    await knex.raw('truncate table users cascade');
    await knex.destroy();
  });

  describe('addUser', () => {

    it('should add user-customer and return it', async () => {

      const userData = {
        email: 'test.add@gmail.com',
        password: 'test123456',
        firstName: 'Bob',
        lastName: 'Snow',
        isDriver: false
      };

      const { user } = await addUser(userData);

      expect(user).toEqual(expect.objectContaining(userData));
    });

    it('should add user-driver and return driver and customer', async () => {

      const userData = {
        email: 'test.add.d@gmail.com',
        password: 'test123456',
        firstName: 'Bob',
        lastName: 'Snow',
        isDriver: true
      };

      const { user, driver } = await addUser(userData);

      expect(user).toEqual(expect.objectContaining(userData));
      expect(driver.userId).toEqual(user.id);
    });
  });
  describe('getUserById', () => {

    it('should return user', async () => {

      const { id } = await knex('users').where({ isDriver: false }).first();
      const { user } = await getUserById(id);

      expect(user.id).toEqual(id);
      expect(user).not.toBe(undefined);
    });

    it('should return user', async () => {

      const { id } = await knex('users').where({ isDriver: true }).first();
      const { user, driver } = await getUserById(id);

      expect(user.id).toEqual(id);
      expect(user).not.toBe(undefined);
      expect(driver).not.toBe(undefined);
    });
  });
});
