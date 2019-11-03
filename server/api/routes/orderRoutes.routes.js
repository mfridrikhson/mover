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
  try {
    const orderRoute = await getOrderRouteById(ctx.params.id);
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

router.post('/', async (ctx) => {
  try {
    const [orderRoute] = await addOrderRoute(ctx.request.body);
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

router.delete('/:id', async (ctx) => {
  try {
    const [orderRoute] = await deleteOrderRouteById(ctx.params.id);
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
