const Router = require('@koa/router');
const router = new Router({ prefix: '/image' });

const { getImageById, upload } = require('../services/images.service');
const imageMiddleware = require('../middlewares/image.middleware');

router.get('/:id', async (ctx) => {
  try {
    ctx.body = await getImageById(ctx.request.params.id);
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

router.post('/', imageMiddleware, async (ctx) => {
  try {
    ctx.body = await upload(ctx.request.file);
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

module.exports = router;
