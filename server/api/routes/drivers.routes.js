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
  try {
    const driver = await getDriverById(ctx.params.id);
    if (driver) {
      ctx.body = driver;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

router.get('/userId/:id', async (ctx) => {
  try{
    const driver = await getDriverByUserId(ctx.params.id);
    if (driver) {
      ctx.body = driver;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

router.get('/currentVehicleId/:id', async (ctx) => {
  try {
    const driver = await getDriverByCurrentVehicleId(ctx.params.id);
    if (driver) {
      ctx.body = driver;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.stats = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

router.post('/', async (ctx) => {
  try {
    const [driver] = await addDriver(ctx.request.body);
    if (driver) {
      ctx.status = 201;
      ctx.body = driver;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

router.delete('/:id', async (ctx) => {
  try {
    const [driver] = await deleteDriverById(ctx.params.id);
    if (driver) {
      ctx.body = driver;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

router.put('/:id', async (ctx) => {
  try {
    const [driver] = await updateDriverById(ctx.params.id, ctx.request.body);
    if (driver) {
      ctx.body = driver;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

module.exports = router;
