require('./config/passport.config');
require('dotenv').config();
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const passport = require('koa-passport');
const http = require('http');
const socketIO = require('socket.io');

const authorizationMiddleware = require('./api/middlewares/authorization.middleware');
const routesWhiteList = require('./config/routes-white-list.config');
const setupRoutesForApp = require('./api/routes');
const { defaultSocketInjector, driversSocketInjector } = require('./socket/injector');
const { defaultHandlers, driverHandlers } = require('./socket/handlers');

const app = new Koa();

const socketServer = http.Server(app.callback());
const io = socketIO(socketServer);
io.on('connection', defaultHandlers);
const driversNsp = io.of('/drivers').on('connection', driverHandlers);

app.use(bodyparser());
app.use(passport.initialize());
app.use(authorizationMiddleware(routesWhiteList));

app.use(defaultSocketInjector(io));
app.use(driversSocketInjector(driversNsp));

setupRoutesForApp(app);

const server = app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port: ${process.env.PORT}`);
});
socketServer.listen(server);

module.exports = server;
