const Router = require('@koa/router');
const rootRouter = new Router({ prefix: '/api' });

const usersRoutes = require('./users.routes');

module.exports = app => {
  rootRouter.use(usersRoutes.routes());

  app.use(rootRouter.routes());
};
