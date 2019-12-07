const Router = require('@koa/router');
const router = new Router({ prefix: '/orders' });

const {
  getAllOrders,
  addOrder,
  updateOrderById
} = require('../services/orders.service');

router.get('/', async (ctx) => {
  ctx.body = await getAllOrders(ctx.request.query);
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

router.put('/:id', async (ctx) => {
  const [order] = await updateOrderById(ctx.params.id, ctx.request.body);
  ctx.body = order;
});

module.exports = router;
