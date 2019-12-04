const Router = require('@koa/router');
const router = new Router({ prefix: '/vehicle-types' });

const { getAllVehicleTypes } = require('../services/vehicleTypes.service');

router.get('/', async (ctx) => {
  ctx.body = await getAllVehicleTypes();
});

module.exports = router;
