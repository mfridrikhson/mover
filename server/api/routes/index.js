const Router = require('@koa/router');
const rootRouter = new Router({ prefix: '/api' });

const usersRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');

module.exports = app => {
  rootRouter.use(usersRoutes.routes());
  rootRouter.use(authRoutes.routes());

  app.use(rootRouter.routes());
};
