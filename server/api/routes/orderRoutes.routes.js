const Router = require('@koa/router');
const router = new Router({ prefix: '/orderRoutes' });

const {
  getAllOrderRoutes,
  getOrderRouteById,
  addOrderRoute,
  deleteOrderRouteById,
  updateOrderRouteById
} = require('../services/orderRoutes.service');

router.get('/', async (ctx) => {
  ctx.body = await getAllOrderRoutes();
});

router.get('/:id', async (ctx) => {
  ctx.body = await getOrderRouteById(ctx.params.id);
});

router.post('/', async (ctx) => {
  const [orderRoute] = await addOrderRoute(ctx.request.body);
  ctx.body = orderRoute;
});

router.delete('/:id', async (ctx) => {
  const [orderRoute] = await deleteOrderRouteById(ctx.params.id);
  ctx.body = orderRoute;
});

router.put('/:id', async (ctx) => {
  try {
    const [orderRoute] = await updateOrderRouteById(ctx.params.id, ctx.request.body);
    if (orderRoute) {
      ctx.body = orderRoute;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

module.exports = router;
