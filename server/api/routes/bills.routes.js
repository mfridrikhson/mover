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
  ctx.body = await getBillById(ctx.params.id);
});

router.post('/', async (ctx) => {
  const [bill] = await addBill(ctx.request.body);
  ctx.body = bill;
});

router.delete('/:id', async (ctx) => {
  const [bill] = await deleteBillById(ctx.params.id);
  ctx.body = bill;
});

router.put('/:id', async (ctx) => {
  const [bill] = await updateBillById(ctx.params.id, ctx.request.body);
  ctx.body = bill;
});

module.exports = router;
