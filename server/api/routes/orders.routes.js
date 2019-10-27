const Router = require('@koa/router');
const router = new Router({ prefix: '/orders' });

const {
  getAllOrders,
  getOrderById,
  addOrder,
  deleteOrderById,
  updateOrderById
} = require('../services/orders.service');

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

router.post('/', async (ctx) => {
  try {
    const [order] = await addOrder(ctx.request.body);
    if (order) {
      ctx.status = 201;
      ctx.body = order;
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
