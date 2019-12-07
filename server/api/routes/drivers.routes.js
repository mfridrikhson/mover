const Router = require('@koa/router');
const router = new Router({ prefix: '/drivers' });

const {
  getDriverById,
  getDriverByUserId,
  updateDriverById
} = require('../services/drivers.service');

router.get('/:id', async (ctx) => {
  ctx.body = await getDriverById(ctx.params.id);
});

router.get('/userId/:id', async (ctx) => {
  ctx.body = await getDriverByUserId(ctx.params.id);
});

router.put('/:id', async (ctx) => {
  const [driver] = await updateDriverById(ctx.params.id, ctx.request.body);
  ctx.body = driver;
});

module.exports = router;
