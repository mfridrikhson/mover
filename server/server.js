const Koa = require('koa');
const app = new Koa();

const setupRoutesForApp = require('./api/routes');

require('dotenv').config();

setupRoutesForApp(app);

const server = app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port: ${process.env.PORT}`);
});

module.exports = server;
