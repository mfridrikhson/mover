const Router = require('@koa/router');
const router = new Router({ prefix: '/users' });

const {
  getUserById,
  addUser,
  updateUserByID
} = require('../services/users.service');

router.get('/:id', async (ctx) => {
  ctx.body = await getUserById(ctx.params.id);
});

router.post('/', async (ctx) => {
  const user = await addUser(ctx.request.body);
  ctx.status = 201;
  ctx.body = user;
});

router.put('/:id', async (ctx) => {
  const [user] = await updateUserByID(ctx.params.id, ctx.request.body);
  ctx.body = user;
});

module.exports = router;

