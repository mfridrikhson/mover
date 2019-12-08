const Router = require('@koa/router');
const router = new Router({ prefix: '/drivers' });

const { updateDriverById } = require('../services/drivers.service');

router.put('/:id', async (ctx) => {
  const [driver] = await updateDriverById(ctx.params.id, ctx.request.body);
  ctx.body = driver;
});

module.exports = router;
