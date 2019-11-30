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

const deleteOrderById = async (id) => (await deleteById(id)).map(order => toJson(order));

const updateOrderById = async (id, order) => {
  return (await updateById(id, order.fromPoint && order.toPoint ? fromJson(order) : order)).map(order => toJson(order));
};

module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  deleteOrderById,
  updateOrderById
};
