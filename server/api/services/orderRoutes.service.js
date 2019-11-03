const {
  getAll,
  getById,
  getByOrderId,
  add,
  deleteById,
  updateById
} = require('../../data/queries/orderRoutes.query');

const getAllOrderRoutes = async () => {
  try {
    return await getAll();
  } catch (err) {
    throw err;
  }
};

const getOrderRouteById = async (id) => {
  try {
    return await getById(id);
  } catch (err) {
    throw err;
  }
};

const getOrderRoutesByOrderId = async (orderId) => {
  try {
    return await getByOrderId(orderId);
  } catch (err) {
    throw err;
  }
};

const addOrderRoute = async (orderRoute) => {
  try {
    return await add({ ...orderRoute, createdAt: new Date() });
  } catch (err) {
    throw err;
  }
};

const deleteOrderRouteById = async (id) => {
  try {
    return await deleteById(id);
  } catch (err) {
    throw err;
  }
};

const updateOrderRouteById = async (id, orderRoute) => {
  try {
    return await updateById(id, orderRoute);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllOrderRoutes,
  getOrderRouteById,
  getOrderRoutesByOrderId,
  addOrderRoute,
  deleteOrderRouteById,
  updateOrderRouteById
};
