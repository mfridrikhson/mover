const Router = require('@koa/router');
const router = new Router({prefix: '/users'});

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
  const user = await getUserById(ctx.params.id);
  if (user.length) {
    ctx.body = user;
  } else {
    ctx.status = 404;
  }
});

router.post('/', async (ctx) => {
  const user = await addUser(ctx.request.body);
  if (user.length){
    ctx.status = 201;
    ctx.body = user;
  } else {
    ctx.status = 400;
  }
});

router.delete('/:id', async (ctx) => {
  const user = await deleteUserById(ctx.params.id);
  if (user.length){
    ctx.status = 200;
    ctx.body = user;
  } else {
    ctx.status = 404;
  }
});

router.put('/:id', async (ctx) => {
  const user = await updateUserByID(ctx.params.id, ctx.request.body);
  if (user.length){
    ctx.status = 200;
    ctx.body = user;
  } else {
    ctx.status = 404;
  }
});

module.exports = router;

