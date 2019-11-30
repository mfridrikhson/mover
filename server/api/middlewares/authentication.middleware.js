const passport = require('koa-passport');

module.exports = (ctx, next) =>
  passport.authenticate('login', async (err, user) => {
    if (err) {
      ctx.throw(err.status, err.message);
    } else {
      ctx.user = user;
      await next();
    }
  } , { session: false })(ctx);
