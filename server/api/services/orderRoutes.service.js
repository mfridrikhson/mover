const {
  add,
} = require('../../data/queries/orderRoutes.query');

const addOrderRoute = async (orderRoute) => add({ ...orderRoute, createdAt: new Date() });

module.exports = {
  addOrderRoute,
};
