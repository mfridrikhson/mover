require('dotenv').config();
const fs = require('fs');
const serve = require('koa-static');
const path = require('path');

const { app, socketServer } = require('./app');

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
