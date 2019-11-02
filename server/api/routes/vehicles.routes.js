const Router = require('@koa/router');
const router = new Router({ prefix: '/vehicles' });

const {
  getAllVehicles,
  getVehicleById,
  getVehiclesByDriverId,
  getVehiclesByVehicleTypeId,
  addVehicle,
  deleteVehicleById,
  updateVehicleById
} = require('../services/vehicles.service');

router.get('/', async (ctx) => {
  ctx.body = await getAllVehicles();
});

router.get('/:id', async (ctx) => {
  try {
    const vehicle = await getVehicleById(ctx.params.id);
    if (vehicle) {
      ctx.body = vehicle;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

router.get('/driverId/:driverId', async (ctx) => {
  try {
    const vehicles = await getVehiclesByDriverId(ctx.params.driverId);
    if (vehicles) {
      ctx.body = vehicles;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

router.get('/vehicleTypeId/:vehicleTypeId', async (ctx) => {
  try {
    const vehicles = await getVehiclesByVehicleTypeId(ctx.params.vehicleTypeId);
    if (vehicles) {
      ctx.body = vehicles;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'error occurred';
  }
});

router.post('/', async (ctx) => {
  try {
    const vehicle = await addVehicle(ctx.request.body);
    if (vehicle) {
      ctx.body = vehicle;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.bod = err.message || 'Error occurred';
  }
});

router.delete('/:id', async (ctx) => {
  try {
    const vehicle = await deleteVehicleById(ctx.params.id);
    if (vehicle) {
      ctx.body = vehicle;
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
    const vehicle = await updateVehicleById(ctx.params.id, ctx.request.body);
    if (vehicle) {
      ctx.body = vehicle;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

module.exports = router;
