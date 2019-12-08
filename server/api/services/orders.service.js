const {
  getAll,
  getById,
  add,
  updateById
} = require('../../data/queries/orders.query');
const { getById: getUserById } = require('../../data/queries/users.query');
const { updateUserById } = require('../services/users.service');
const { getDriverById } = require('../services/drivers.service');

const {
  fromJson,
  toJson
} = require('../../helpers/orders.helper');

const getAllOrders = async (filters) => {
  const orders = await getAll(filters).map(order => toJson(order));
  const orderCustomers = await Promise.all(orders.map(({ customerId }) => getUserById(customerId)));
  return orders.map((order, idx) => ({ ...order, customer: orderCustomers[idx] }));
};

const getOrderById = async (id) => {
  const order = toJson(await getById(id));
  const orderCustomer = await getUserById(order.customerId);
  return {
    ...order,
    customer: orderCustomer
  };
};

const addOrder = async (order) => {
  const [newOrder] = await add(fromJson(order));
  return toJson(newOrder);
};

const updateOrderById = async (id, order) => {
  const updatedOrder = (await updateById(id, order.fromPoint && order.toPoint ? fromJson(order) : order)).map(order => toJson(order));
  await updateRating(updatedOrder[0]);
  return updatedOrder;
};

const updateRating = async ({ customerId, driverId, userRating, driverRating }) => {
  if (driverRating) {
    const { userId: driverUserId } = await getDriverById(driverId);
    await updateUserRating(driverUserId, driverId);
  }
  if (userRating) {
    await updateUserRating(customerId);
  }
};

const updateUserRating = async (userId, driverId) => {
  const idPropName = driverId ? 'driverId': 'customerId';
  const ratingPropName = driverId ? 'driverRating': 'userRating';
  const result = await getAllOrders({ [idPropName]: driverId ? driverId : userId });
  const len = result.filter(order => !!order[ratingPropName]).length;
  const sum = result
    .filter(order => !!order[ratingPropName])
    .map(order => order[ratingPropName])
    .reduce((acc, cur) => acc + cur);

  await updateUserById(userId, { rating: sum / len });
};

module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrderById
};


