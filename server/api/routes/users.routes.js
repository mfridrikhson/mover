const Router = require('@koa/router');
const router = new Router({ prefix: '/users' });

const {
  updateUserByID
} = require('../services/users.service');

router.put('/:id', async (ctx) => {
  const [user] = await updateUserByID(ctx.params.id, ctx.request.body);
  ctx.body = user;
});

module.exports = router;

