const Router = require('@koa/router');
const router = new Router({ prefix: '/users' });

const {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  updateUserByID
} = require('../services/users.service');

router.get('/', async (ctx) => {
  ctx.body = await getAllUsers();
});

router.get('/:id', async (ctx) => {
  try {
    const user = await getUserById(ctx.params.id);
    if (user) {
      ctx.body = user;
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
    const [user] = await addUser(ctx.request.body);
    if (user) {
      ctx.status = 201;
      ctx.body = user;
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
    const [user] = await deleteUserById(ctx.params.id);
    if (user) {
      ctx.body = user;
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
    const [user] = await updateUserByID(ctx.params.id, ctx.request.body);
    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 400;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message || 'Error occurred';
  }
});

module.exports = router;

