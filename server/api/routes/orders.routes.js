const Router = require('@koa/router');
const router = new Router({ prefix: '/orders' });

const {
  getAllOrders,
  getOrderById,
  addOrder,
  deleteOrderById,
  updateOrderById
} = require('../services/orders.service');

const { getOrderRoutesByOrderId } = require('../services/orderRoutes.service');

router.get('/', async (ctx) => {
  ctx.body = await getAllOrders(ctx.request.query);
});

router.get('/:id', async (ctx) => {
  ctx.body = await getOrderById(ctx.params.id);
});

router.get('/:id/route', async (ctx) => {
  ctx.body = await getOrderRoutesByOrderId(ctx.params.id);
});

router.post('/', async (ctx) => {
  const order = await addOrder({ ...ctx.request.body, customerId: ctx.user.id });
  ctx.status = 201;
  ctx.body = order;
  ctx.io.to('drivers').emit('newOrder', {
    ...order,
    customer: ctx.user
  });
});

router.delete('/:id', async (ctx) => {
  const [order] = await deleteOrderById(ctx.params.id);
  ctx.body = order;
});

router.put('/:id', async (ctx) => {
  const [order] = await updateOrderById(ctx.params.id, ctx.request.body);
  ctx.body = order;
});

module.exports = router;
