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
const socketInjector = require('./socket/injector');
const socketHandlers = require('./socket/handlers');

const app = new Koa();

const socketServer = http.Server(app.callback());
const io = socketIO(socketServer);
io.on('connection', socketHandlers);

app.use(bodyparser());
app.use(passport.initialize());
app.use(authorizationMiddleware(routesWhiteList));

app.use(socketInjector(io));

setupRoutesForApp(app);

const server = app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port: ${process.env.PORT}`);
});
socketServer.listen(server);

module.exports = server;
