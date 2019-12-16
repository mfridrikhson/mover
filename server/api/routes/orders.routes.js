const Router = require('@koa/router');
const router = new Router({ prefix: '/orders' });

const {
  addOrder,
  updateOrderById
} = require('../services/orders.service');

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
  ctx.body = await updateOrderById(ctx.params.id, ctx.request.body);
});

module.exports = router;
