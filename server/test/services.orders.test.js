const knex = require('../data/db/connection');

const {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrderById
} = require('../api/services/orders.service');

describe('services : orders', () => {
  beforeAll(async () => {
    await knex('users').insert({
      email: 'test@gmail.com',
      password: 'test123456',
      firstName: 'Bob',
      lastName: 'Snow',
      isDriver: false
    })
  });

  afterEach(async () => {
    await knex.raw('delete from orders');
  });

  afterAll(async () => {
    await knex.raw('truncate table users cascade');
    await knex.destroy();
  });

  describe('getAllOrders', () => {
    beforeEach(async () => {
      const { id: userId } = await knex('users').first();
      const { id: vehicleTypeId } = await knex('vehicleTypes').first();
      const addedOrders = [
        {
          customerId: userId,
          volumeWeight: 1,
          cargoType: 'Furniture',
          vehicleTypeId,
          fromPointAddress: 'Point B',
          fromPointLat: 21.21,
          fromPointLng: 21.21,
          toPointAddress: 'Point A',
          toPointLat: 12.12,
          toPointLng: 12.12,
          status: 'Pending',
          createdAt: new Date()
        },
        {
          customerId: userId,
          volumeWeight: 1,
          cargoType: 'Furniture',
          vehicleTypeId,
          fromPointAddress: 'Point B',
          fromPointLat: 21.21,
          fromPointLng: 21.21,
          toPointAddress: 'Point A',
          toPointLat: 12.12,
          toPointLng: 12.12,
          status: 'Cancelled',
          createdAt: new Date()
        }
      ];

      await knex('orders').insert(addedOrders);
    });

    it('should return all orders mapped to a proper form', async () => {
      const { id: userId } = await knex('users').first();
      const { id: vehicleTypeId } = await knex('vehicleTypes').first();
      const expectedOrders = [
        {
          customerId: userId,
          volumeWeight: 1,
          cargoType: 'Furniture',
          vehicleTypeId,
          fromPoint: {
            address: 'Point B',
            coords: {
              lat: 21.21,
              lng: 21.21
            }
          },
          toPoint: {
            address: 'Point A',
            coords: {
              lat: 12.12,
              lng: 12.12
            }
          },
          status: 'Pending'
        },
        {
          customerId: userId,
          volumeWeight: 1,
          cargoType: 'Furniture',
          vehicleTypeId,
          fromPoint: {
            address: 'Point B',
            coords: {
              lat: 21.21,
              lng: 21.21
            }
          },
          toPoint: {
            address: 'Point A',
            coords: {
              lat: 12.12,
              lng: 12.12
            }
          },
          status: 'Cancelled'
        }
      ];

      const orders = await getAllOrders({});

      expect(orders).toEqual(
        expect.arrayContaining(
          expectedOrders.map(order => expect.objectContaining(order))
        )
      );
      expect(orders.length).toBe(2);
    });

    it('should return filtered orders mapped to a proper form', async () => {
      const { id: userId } = await knex('users').first();
      const { id: vehicleTypeId } = await knex('vehicleTypes').first();
      const expectedOrders = [
        {
          customerId: userId,
          volumeWeight: 1,
          cargoType: 'Furniture',
          vehicleTypeId,
          fromPoint: {
            address: 'Point B',
            coords: {
              lat: 21.21,
              lng: 21.21
            }
          },
          toPoint: {
            address: 'Point A',
            coords: {
              lat: 12.12,
              lng: 12.12
            }
          },
          status: 'Pending'
        }
      ];

      const orders = await getAllOrders({ status: 'Pending' });

      expect(orders).toEqual(
        expect.arrayContaining(
          expectedOrders.map(order => expect.objectContaining(order))
        )
      );
      expect(orders.length).toBe(1);
    });
  });

  describe('getOrderById', () => {
    it('should return order corresponding to id mapped to a proper form with customer', async () => {
      const customer = await knex('users').first();
      const { id: vehicleTypeId } = await knex('vehicleTypes').first();
      const addedOrder = {
        customerId: customer.id,
        volumeWeight: 1,
        cargoType: 'Furniture',
        vehicleTypeId,
        fromPointAddress: 'Point B',
        fromPointLat: 21.21,
        fromPointLng: 21.21,
        toPointAddress: 'Point A',
        toPointLat: 12.12,
        toPointLng: 12.12,
        status: 'Pending',
        createdAt: new Date()
      };
      const [{ id: orderId }] = await knex('orders').insert(addedOrder).returning('*');
      const expectedOrder = {
        id: orderId,
        customer,
        volumeWeight: 1,
        cargoType: 'Furniture',
        vehicleTypeId,
        fromPoint: {
          address: 'Point B',
          coords: {
            lat: 21.21,
            lng: 21.21
          }
        },
        toPoint: {
          address: 'Point A',
          coords: {
            lat: 12.12,
            lng: 12.12
          }
        },
        status: 'Pending'
      };

      const order = await getOrderById(orderId);

      expect(order).toEqual(expect.objectContaining(expectedOrder));
    });
  });

  describe('addOrder', () => {
    it('should return added order mapped to a proper form', async () => {
      const { id: customerId } = await knex('users').first();
      const { id: vehicleTypeId } = await knex('vehicleTypes').first();
      const expectedOrder = {
        customerId,
        volumeWeight: 1,
        cargoType: 'Furniture',
        vehicleTypeId,
        fromPoint: {
          address: 'Point B',
          coords: {
            lat: 21.21,
            lng: 21.21
          }
        },
        toPoint: {
          address: 'Point A',
          coords: {
            lat: 12.12,
            lng: 12.12
          }
        },
        status: 'Pending'
      };

      const order = await addOrder(expectedOrder);

      expect(order).toEqual(expect.objectContaining(expectedOrder));
    });
  });

  describe('updateOrderById', () => {
    beforeAll(async () => {
      const [{ id: driverUserId }] = await knex('users')
        .insert({
          email: 'test@gmail.com',
          password: 'test123456',
          firstName: 'Bob',
          lastName: 'Snow',
          isDriver: true
        })
        .returning('*');
      const orderDriver = {
        userId: driverUserId,
        driverLicenseUrl: 'http://url.com'
      };

      await knex('drivers').insert(orderDriver);
    });

    beforeEach(async () => {
      const { id: customerId } = await knex('users').first();
      const { id: driverId } = await knex('drivers').first();
      const { id: vehicleTypeId } = await knex('vehicleTypes').first();

      const addedOrder = {
        customerId,
        driverId,
        volumeWeight: 1,
        cargoType: 'Furniture',
        vehicleTypeId,
        fromPointAddress: 'Point B',
        fromPointLat: 21.21,
        fromPointLng: 21.21,
        toPointAddress: 'Point A',
        toPointLat: 12.12,
        toPointLng: 12.12,
        status: 'Pending',
        createdAt: new Date()
      };

      await knex('orders').insert(addedOrder).returning('*');
    });

    afterAll(() => {
      return knex.raw('truncate table drivers cascade');
    });

    it('should return updated order mapped to a proper form', async () => {
      const { id: customerId } = await knex('users').first();
      const { id: orderId } = await knex('orders').first();
      const { id: vehicleTypeId } = await knex('vehicleTypes').first();
      const { id: driverId } = await knex('drivers').first();
      const expectedOrder = {
        customerId,
        driverId,
        volumeWeight: 1,
        cargoType: 'Furniture',
        vehicleTypeId,
        fromPoint: {
          address: 'Point B',
          coords: {
            lat: 21.21,
            lng: 21.21
          }
        },
        toPoint: {
          address: 'Point A',
          coords: {
            lat: 12.12,
            lng: 12.12
          }
        },
        status: 'Pending'
      };

      const [order] = await updateOrderById(orderId, { driverId });

      expect(order).toEqual(expect.objectContaining(expectedOrder));
    });

    it('should return updated order and update user ratings if it gets set', async () => {
      const { id: orderId } = await knex('orders').first();
      const { id: vehicleTypeId } = await knex('vehicleTypes').first();
      const expectedOrder = {
        volumeWeight: 1,
        cargoType: 'Furniture',
        vehicleTypeId,
        fromPoint: {
          address: 'Point B',
          coords: {
            lat: 21.21,
            lng: 21.21
          }
        },
        toPoint: {
          address: 'Point A',
          coords: {
            lat: 12.12,
            lng: 12.12
          }
        },
        userRating: 5,
        status: 'Pending'
      };

      const [order] = await updateOrderById(orderId, { userRating: 5 });

      const { rating: customerRating } = await knex('users').where({ id: order.customerId }).first();
      expect(order).toEqual(expect.objectContaining(expectedOrder));
      expect(customerRating).toBe(5);
    });

    it('should return updated order and update driver ratings if it gets set', async () => {
      const { id: orderId } = await knex('orders').first();
      const { userId: driverUserId } = await knex('drivers').first();
      const { id: vehicleTypeId } = await knex('vehicleTypes').first();
      const expectedOrder = {
        volumeWeight: 1,
        cargoType: 'Furniture',
        vehicleTypeId,
        fromPoint: {
          address: 'Point B',
          coords: {
            lat: 21.21,
            lng: 21.21
          }
        },
        toPoint: {
          address: 'Point A',
          coords: {
            lat: 12.12,
            lng: 12.12
          }
        },
        driverRating: 2,
        status: 'Pending'
      };

      const [order] = await updateOrderById(orderId, { driverRating: 2 });

      const { rating: driverRating } = await knex('users').where({ id: driverUserId }).first();
      expect(order).toEqual(expect.objectContaining(expectedOrder));
      expect(driverRating).toBe(2);
    });
  });
});
