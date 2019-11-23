require('./config/passport.config');
require('dotenv').config();
const Koa = require('koa');
const fs = require('fs');
const bodyparser = require('koa-bodyparser');
const serve = require('koa-static');
const path = require('path');
const passport = require('koa-passport');
const http = require('http');
const socketIO = require('socket.io');

const setupRoutesForApp = require('./api/routes');
const socketInjector = require('./socket/injector');
const socketHandlers = require('./socket/handlers');

const app = new Koa();

const socketServer = http.Server(app.callback());
const io = socketIO(socketServer);
io.on('connection', socketHandlers);

app.use(bodyparser());
app.use(passport.initialize());

app.use(socketInjector(io));

setupRoutesForApp(app);

app.use(serve(path.join(__dirname, '../client/build')));
app.use(ctx => {
  ctx.type = 'html';
  ctx.body = fs.readFileSync(`${__dirname}/../client/build/index.html`);
});


const server = app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port: ${process.env.PORT}`);
});
socketServer.listen(server);

module.exports = server;
