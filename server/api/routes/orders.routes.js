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
  try {
    const order = await getOrderById(ctx.params.id);
    if (order) {
      ctx.body = order;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

router.get('/:id/route', async (ctx) => {
  try {
    const orderRoutes = await getOrderRoutesByOrderId(ctx.params.id);
    if (orderRoutes) {
      ctx.body = orderRoutes;
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
    const order = await addOrder({ ...ctx.request.body, customerId: ctx.user.id });

    if (order) {
      ctx.status = 201;
      ctx.body = order;
      ctx.io.to('drivers').emit('newOrder', {
        ...order,
        customer: ctx.user
      });
    } else {
      ctx.body = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

router.delete('/:id', async (ctx) => {
  try {
    const [order] = await deleteOrderById(ctx.params.id);
    if (order) {
      ctx.body = order;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

router.put('/:id', async (ctx) => {
  try{
    const [order] = await updateOrderById(ctx.params.id, ctx.request.body);
    if (order) {
      ctx.body = order;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occured';
  }
});

module.exports = router;
