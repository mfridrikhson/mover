const passport = require('koa-passport');

module.exports = passport.authenticate('login', { session: false });
