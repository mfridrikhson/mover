const passport = require('koa-passport');

module.exports = (ctx, next) =>
  passport.authenticate('jwt', async (err, user) => {
    if (err || !user) {
      ctx.status = err ? err.status : 401;

      if (err) {
        ctx.body = err.message;
      }
    } else {
      ctx.user = user;
      return await next();
    }
  } , { session: false })(ctx);
