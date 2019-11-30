const Router = require('@koa/router');

const authenticationMiddleware = require('../middlewares/authentication.middleware');
const registrationMiddleware = require('../middlewares/registration.middleware');

const { login, register } = require('../services/auth.service');
const { getUserById } = require('../services/users.service');

const router = new Router({ prefix: '/auth' });

router.post('/login', authenticationMiddleware, async (ctx) => {
  ctx.body = await login(ctx.user);
});

router.post('/register', registrationMiddleware, async (ctx) => {
  ctx.body = await register(ctx.user);
  ctx.status = 201;
});

router.get('/user', async (ctx) => {
  ctx.body = await getUserById(ctx.user.id);
});

module.exports = router;
