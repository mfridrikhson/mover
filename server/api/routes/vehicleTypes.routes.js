const Router = require('@koa/router');
const router = new Router({ prefix: '/vehicle-types' });

const {
  getAllVehicleTypes,
  getVehicleTypeById,
  addVehicleType,
  deleteVehicleTypeById,
  updateVehicleTypeById
} = require('../services/vehicleTypes.service');

router.get('/', async (ctx) => {
  ctx.body = await getAllVehicleTypes();
});

router.get('/:id', async (ctx) => {
  try {
    const vehicleType = await getVehicleTypeById(ctx.params.id);
    if (vehicleType) {
      ctx.body = vehicleType;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

router.post('/', async (ctx) => {
  try {
    const [vehicleType] = await addVehicleType(ctx.request.body);
    if (vehicleType) {
      ctx.body = vehicleType;
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
    const [vehicleType] = await deleteVehicleTypeById(ctx.params.id);
    if (vehicleType) {
      ctx.body = vehicleType;
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
    const [vehicleType] = await updateVehicleTypeById(ctx.params.id, ctx.request.body);
    if (vehicleType) {
      ctx.body = vehicleType;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

module.exports = router;
