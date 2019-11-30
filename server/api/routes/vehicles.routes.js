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
  ctx.body = await getVehicleById(ctx.params.id);
});

router.get('/driver/:driverId', async (ctx) => {
  ctx.body = await getVehiclesByDriverId(ctx.params.driverId);
});

router.get('/type/:vehicleTypeId', async (ctx) => {
  ctx.body = await getVehiclesByVehicleTypeId(ctx.params.vehicleTypeId);
});

router.post('/', async (ctx) => {
  ctx.body = await addVehicle(ctx.request.body);
});

router.delete('/:id', async (ctx) => {
  ctx.body = await deleteVehicleById(ctx.params.id);
});

router.put('/:id', async (ctx) => {
  ctx.body = await updateVehicleById(ctx.params.id, ctx.request.body);
});

module.exports = router;
