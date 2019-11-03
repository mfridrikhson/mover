const Router = require('@koa/router');
const rootRouter = new Router({ prefix: '/api' });

const usersRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');
const ordersRoutes = require('./orders.routes');
const driversRoutes = require('./drivers.routes');
const vehicleTypesRoutes = require('./vehicleTypes.routes');
const vehiclesRoutes = require('./vehicles.routes');
const billsRoutes = require('./bills.routes');

module.exports = app => {
  rootRouter.use(usersRoutes.routes());
  rootRouter.use(authRoutes.routes());
  rootRouter.use(ordersRoutes.routes());
  rootRouter.use(driversRoutes.routes());
  rootRouter.use(vehicleTypesRoutes.routes());
  rootRouter.use(vehiclesRoutes.routes());
  rootRouter.use(billsRoutes.routes());

  app.use(rootRouter.routes());
};
