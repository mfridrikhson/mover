const {
  getAll,
  getById,
  add,
  deleteById,
  updateById
} = require('../../data/queries/orders.query');

const {
  fromJson,
  toJson
} = require('../../helpers/orders.helper');


const getAllOrders = async (filters) => {
  try {
    return await getAll(filters).map(order => toJson(order));
  } catch (err) {
    throw err;
  }
};

const getOrderById = async (id) => {
  try {
    return toJson(await getById(id));
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
