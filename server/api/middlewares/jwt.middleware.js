const passport = require('koa-passport');

module.exports = (ctx, next) =>
  passport.authenticate('jwt', async (err, user) => {
    if (err) {
      ctx.status = err.status;
      ctx.body = err.message;
    } else {
      ctx.user = user;
      await next();
    }
  },{ session: false })(ctx);
