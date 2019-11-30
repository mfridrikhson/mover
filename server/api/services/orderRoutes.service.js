const {
  getAll,
  getById,
  getByOrderId,
  add,
  deleteById,
  updateById
} = require('../../data/queries/orderRoutes.query');

const getAllOrderRoutes = () => getAll();

const getOrderRouteById = (id) => getById(id);

const getOrderRoutesByOrderId = (orderId) => getByOrderId(orderId);

const addOrderRoute = async (orderRoute) => add({ ...orderRoute, createdAt: new Date() });

const deleteOrderRouteById = async (id) => deleteById(id);

const updateOrderRouteById = (id, orderRoute) => updateById(id, orderRoute);

module.exports = {
  getAllOrderRoutes,
  getOrderRouteById,
  getOrderRoutesByOrderId,
  addOrderRoute,
  deleteOrderRouteById,
  updateOrderRouteById
};
