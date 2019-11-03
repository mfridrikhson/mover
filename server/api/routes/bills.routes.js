const Router = require('@koa/router');
const router = new Router({ prefix: '/bills' });

const {
  getAllBills,
  getBillById,
  addBill,
  deleteBillById,
  updateBillById
} = require('../services/bills.service');

router.get('/', async (ctx) => {
  ctx.body = await getAllBills();
});

router.get('/:id', async (ctx) => {
  try {
    const bill = await getBillById(ctx.params.id);
    if (bill) {
      ctx.body = bill;
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
    const [bill] = await addBill(ctx.request.body);
    if (bill) {
      ctx.body = bill;
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
    const [bill] = await deleteBillById(ctx.params.id);
    if (bill) {
      ctx.body = bill;
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
    const [bill] = await updateBillById(ctx.params.id, ctx.request.body);
    if (bill) {
      ctx.body = bill;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

module.exports = router;
