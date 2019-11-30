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
  ctx.body = await getVehicleTypeById(ctx.params.id);
});

router.post('/', async (ctx) => {
  const [vehicleType] = await addVehicleType(ctx.request.body);
  ctx.body = vehicleType;
});

router.delete('/:id', async (ctx) => {
  const [vehicleType] = await deleteVehicleTypeById(ctx.params.id);
  ctx.body = vehicleType;
});

router.put('/:id', async (ctx) => {
  const [vehicleType] = await updateVehicleTypeById(ctx.params.id, ctx.request.body);
  ctx.body = vehicleType;
});

module.exports = router;
