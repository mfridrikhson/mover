const passport = require('koa-passport');

module.exports = passport.authenticate('jwt', { session: false });
