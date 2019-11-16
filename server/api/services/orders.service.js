const {
  getAll,
  getById,
  add,
  deleteById,
  updateById
} = require('../../data/queries/orders.query');
const { getById: getUserById } = require('../../data/queries/users.query');

const {
  fromJson,
  toJson
} = require('../../helpers/orders.helper');


const getAllOrders = async (filters) => {
  try {
    const orders = await getAll(filters).map(order => toJson(order));
    const orderCustomers = await Promise.all(orders.map(({ customerId }) => getUserById(customerId)));
    return orders.map((order, idx) => ({ ...order, customer: orderCustomers[idx] }));
  } catch (err) {
    throw err;
  }
};

const getOrderById = async (id) => {
  try {
    const order = toJson(await getById(id));
    const orderCustomer = await getUserById(order.customerId);
    return {
      ...order,
      customer: orderCustomer
    };
  } catch (err) {
    throw err;
  }
};

const addOrder = async (order) => {
  try {
    const [newOrder] = await add(fromJson(order));
    return toJson(newOrder);
  } catch (err) {
    throw err;
  }
};

const deleteOrderById = async (id) => {
  try {
    return await deleteById(id).map(order => toJson(order));
  } catch (err) {
    throw err;
  }
};

const updateOrderById = async (id, order) => {
  try {
    return await updateById(id, fromJson(order)).map(order => toJson(order));
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  deleteOrderById,
  updateOrderById
};
