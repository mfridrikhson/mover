const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const passport = require('koa-passport');
const socketIO = require('socket.io');
const http = require('http');

const setupRoutesForApp = require('./api/routes');
const socketInjector = require('./socket/injector');
const socketHandlers = require('./socket/handlers');
require('./config/passport.config');

const app = new Koa();

app.use(bodyparser());
app.use(passport.initialize());

const socketServer = http.Server(app.callback());
const io = socketIO(socketServer);
io.on('connection', socketHandlers);

app.use(socketInjector(io));

setupRoutesForApp(app);

module.exports = { app, socketServer };
