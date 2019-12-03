const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const passport = require('koa-passport');
const setupRoutesForApp = require('./api/routes');
require('./config/passport.config');

const app = new Koa();

app.use(bodyparser());
app.use(passport.initialize());
setupRoutesForApp(app);

module.exports = app;
