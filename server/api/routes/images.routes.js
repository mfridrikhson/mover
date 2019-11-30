const Router = require('@koa/router');
const router = new Router({ prefix: '/images' });

const { getImageById, upload } = require('../services/images.service');
const imageMiddleware = require('../middlewares/image.middleware');

router.get('/:id', async (ctx) => {
  ctx.body = await getImageById(ctx.request.params.id);
});

router.post('/', imageMiddleware, async (ctx) => {
  const [image] = (await upload(ctx.request.file));
  ctx.body = image;
});

module.exports = router;
