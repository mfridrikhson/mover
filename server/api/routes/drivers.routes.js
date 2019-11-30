const Router = require('@koa/router');
const router = new Router({ prefix: '/drivers' });

const {
  getAllDrivers,
  getDriverById,
  getDriverByUserId,
  getDriverByCurrentVehicleId,
  addDriver,
  deleteDriverById,
  updateDriverById
} = require('../services/drivers.service');

router.get('/', async (ctx) => {
  ctx.body = await getAllDrivers();
});

router.get('/:id', async (ctx) => {
  ctx.body = await getDriverById(ctx.params.id);
});

router.get('/userId/:id', async (ctx) => {
  ctx.body = await getDriverByUserId(ctx.params.id);
});

router.get('/currentVehicleId/:id', async (ctx) => {
  ctx.body = await getDriverByCurrentVehicleId(ctx.params.id);
});

router.post('/', async (ctx) => {
  const [driver] = await addDriver(ctx.request.body);
  ctx.status = 201;
  ctx.body = driver;
});

router.delete('/:id', async (ctx) => {
  const [driver] = await deleteDriverById(ctx.params.id);
  ctx.body = driver;
});

router.put('/:id', async (ctx) => {
  const [driver] = await updateDriverById(ctx.params.id, ctx.request.body);
  ctx.body = driver;
});

module.exports = router;
