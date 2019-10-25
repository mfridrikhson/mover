const {
  getAll,
  getById,
  getByDriverId,
  getByCustomerId,
  getByStatus,
  add,
  deleteById,
  updateById
} = require('../../data/queries/orders.query');

const {
  fromJson,
  toJson
} = require('../../helpers/orders.helper');

//TODO Add filters

const getAllOrders = async () => {
  try {
    return await getAll().map(order => toJson(order));
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

const getOrdersByDriverId = async (driverId) => {
  try {
    return await getByDriverId(driverId).map(order => toJson(order));
  } catch (err) {
    throw err;
  }
};

const getOrdersByCustomerId = async (customerId) => {
  try {
    return await getByCustomerId(customerId).map(order => toJson(order));
  } catch (err) {
    throw err;
  }
};

const getOrdersByStatus = async (status) => {
  try {
    return await getByStatus(status).map(order => toJson(order));
  } catch (err) {
    throw err;
  }
};

const addOrder = async (order) => {
  try {
    return await add(fromJson(order));
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
  getOrdersByDriverId,
  getOrdersByCustomerId,
  getOrdersByStatus,
  addOrder,
  deleteOrderById,
  updateOrderById
};
