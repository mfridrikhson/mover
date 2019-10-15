require('./config/passport.config');
require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser');
const passport = require('koa-passport');

const authorizationMiddleware = require('./api/middlewares/authorization.middleware');
const routesWhiteList = require('./config/routes-white-list.config');

const setupRoutesForApp = require('./api/routes');
app.use(bodyparser());
/*app.use(async (ctx, next) => {
  await next();
  console.log(ctx.request);
  console.log(ctx.response);
});*/
app.use(passport.initialize());
app.use(authorizationMiddleware(routesWhiteList));
setupRoutesForApp(app);


const server = app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port: ${process.env.PORT}`);
});

module.exports = server;
