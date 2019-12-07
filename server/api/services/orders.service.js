const {
  getAll,
  getById,
  add,
  updateById
} = require('../../data/queries/orders.query');
const { getById: getUserById } = require('../../data/queries/users.query');
const { updateUserByID } = require('../services/users.service');
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
  const updatedOrder = await getById(id);
  await updateRating(updatedOrder);
  return (await updateById(id, order.fromPoint && order.toPoint ? fromJson(order) : order)).map(order => toJson(order));
};

const updateRating = ({ customerId, driverId, userRating, driverRating }) => {
  if (driverRating) {
    updateDriverRating(driverId);
  }
  if (userRating) {
    updateCustomerRating(customerId);
  }
};

const updateUserRating = async (id, userIsDriver) => {
  const idPropName = userIsDriver ? 'driverId': 'customerId';
  const ratingPropName = userIsDriver ? 'driverRating': 'userRating';
  const result = await getAllOrders({ [idPropName]: id });
  const len = result.filter(order => !!order[ratingPropName]).length;
  const sum = result
    .filter(order => !!order[ratingPropName])
    .map(order => order[ratingPropName])
    .reduce((acc, cur) => acc + cur);

  await updateUserByID(id, { rating: sum / len });
};

const updateDriverRating = async (driverId) => {
  const { userId } = await getDriverById( driverId );
  const userIsDriver = true;

  await updateUserRating(userId, userIsDriver);
};

const updateCustomerRating = async (customerId) => {
  await updateUserRating(customerId);
};

module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrderById
};


