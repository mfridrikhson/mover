const Router = require('@koa/router');
const router = new Router({ prefix: '/vehicles' });

const {
  getVehiclesByDriverId,
  addVehicle,
} = require('../services/vehicles.service');

router.get('/driver/:driverId', async (ctx) => {
  ctx.body = await getVehiclesByDriverId(ctx.params.driverId);
});

router.post('/', async (ctx) => {
  ctx.body = await addVehicle(ctx.request.body);
});

module.exports = router;
