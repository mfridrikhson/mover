const Router = require('@koa/router');
const router = new Router({ prefix: '/users' });

const{ getAllUsers } = require('../services/users.service');

router.get('/', async (ctx) => {
  const data = await getAllUsers();
  ctx.body = {
    status: 'success',
    data: data
  };
});

module.exports = router;
