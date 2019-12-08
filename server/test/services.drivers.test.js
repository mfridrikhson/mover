const knex = require('../data/db/connection');

const {
  getDriverById,
  getDriverByUserId,
  addDriver,
  updateDriverById
} = require('../api/services/drivers.service');

describe('services : drivers', () => {
  beforeAll(async () => {
    await knex('users').insert({
      email: 'test@gmail.com',
      password: 'test123456',
      firstName: 'Bob',
      lastName: 'Snow',
      isDriver: true
    })
  });

  afterEach(async () => {
    await knex.raw('delete from drivers');
  });

  afterAll(async () => {
    await knex.raw('truncate table vehicles cascade');
    await knex.raw('truncate table users cascade');
    await knex.destroy();
  });

  describe('getDriverById', () => {
    it('should return driver, corresponding to the id', async () => {
      const { id: userId } = await knex('users').first();
      const addedDriver = {
        userId,
        driverLicenseUrl: 'http://url.com'
      };
      const [{ id: driverId }] = await knex('drivers').insert(addedDriver).returning('*');

      const driver = await getDriverById(driverId);

      expect(driver).toEqual(expect.objectContaining(addedDriver));
      expect(driver.id).toEqual(driverId);
    });
  });

  describe('getDriverByUserId', () => {
    it('should return driver, corresponding to the userId', async () => {
      const { id: userId } = await knex('users').first();
      const addedDriver = {
        userId,
        driverLicenseUrl: 'http://url.com'
      };
      await knex('drivers').insert(addedDriver);

      const driver = await getDriverByUserId(userId);

      expect(driver).toEqual(expect.objectContaining(addedDriver));
      expect(driver.userId).toEqual(userId);
    });

    it('should return driver, corresponding to the userId with current vehicle if he has one', async () => {
      const { id: userId } = await knex('users').first();
      const addedDriver = {
        userId,
        driverLicenseUrl: 'http://url.com'
      };
      const { id: vehicleTypeId } = await knex('vehicleTypes').select('*').first();
      const currentVehicle = {
        name: 'Daewoo Lanos',
        registrationPlate: 'АА 1234 АН',
        color: '#000000',
        vehicleTypeId: vehicleTypeId,
        photoUrl: 'http://some.url',
        techPassportUrl: 'http://some.url'
      };
      const [{ id: driverId }] = await knex('drivers').insert(addedDriver).returning('*');
      const [{ id: vehicleId }] = await knex('vehicles').insert({ ...currentVehicle, driverId: addedDriver.id }).returning('*');
      await knex('drivers').update({ currentVehicleId: vehicleId }).where({ id: driverId });

      const driver = await getDriverByUserId(userId);

      expect(driver).toEqual(
        expect.objectContaining({
          ...addedDriver,
          currentVehicle: expect.objectContaining(currentVehicle)
        })
      );
      expect(driver.userId).toEqual(userId);
    });
  });

  describe('addDriver', () => {
    it('should return added driver', async () => {
      const { id: userId } = await knex('users').first();
      const addedDriver = {
        userId,
        driverLicenseUrl: 'http://url.com'
      };

      const [driver] = await addDriver(addedDriver);

      expect(driver).toEqual(expect.objectContaining(addedDriver));
    });
  });

  describe('updateDriverById', () => {
    it('should return updated driver', async () => {
      const { id: userId } = await knex('users').first();
      const addedDriver = {
        userId,
        driverLicenseUrl: 'http://url.com'
      };
      const updatedDriverLicenseUrl = 'http://updated.com';
      const [{ id: driverId }] = await knex('drivers').insert(addedDriver).returning('*');

      const [driver] = await updateDriverById(driverId, { driverLicenseUrl: updatedDriverLicenseUrl });

      expect(driver).toEqual(expect.objectContaining({
        ...addedDriver,
        driverLicenseUrl: updatedDriverLicenseUrl
      }));
    });
  });
});
