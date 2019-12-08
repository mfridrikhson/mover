const Router = require('@koa/router');
const router = new Router({ prefix: '/users' });

const {
  updateUserById
} = require('../services/users.service');

router.put('/:id', async (ctx) => {
  const [user] = await updateUserById(ctx.params.id, ctx.request.body);
  ctx.body = user;
});

module.exports = router;

