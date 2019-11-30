const passport = require('koa-passport');

module.exports = (ctx, next) =>
  passport.authenticate('jwt', async (err, user) => {
    if (err || !user) {
      if (err) {
        ctx.throw(err.status, err.message);
      } else {
        ctx.throw(401, 'Invalid token');
      }
    } else {
      ctx.user = user;
      return await next();
    }
  } , { session: false })(ctx);
