const Router = require('@koa/router');

const authenticationMiddleware = require('../middlewares/authentication.middleware');
const registrationMiddleware = require('../middlewares/registration.middleware');
const jwtMiddleware = require('../middlewares/jwt.middleware');

const { login, register } = require('../services/auth.service');
const { getUserById } = require('../services/users.service');

const router = new Router({ prefix: '/auth' });

router.post('/', async (ctx) => {
  ctx.body = 'Hey!';
});

router.post('/login', authenticationMiddleware, async (ctx) => {
  try {
    ctx.body = await login(ctx.user);
  } catch (err) {
    console.log(err);
  }
});

router.post('/register', registrationMiddleware, async (ctx)=> {
  try {
    ctx.body = await register(ctx.user);
    ctx.status = 201;
  } catch(err) {
    console.log(err);
  }
});

router.get('/user', jwtMiddleware, async (ctx) => {
  ctx.body = await getUserById(ctx.user.id);
});

module.exports = router;
