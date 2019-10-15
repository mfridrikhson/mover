const passport = require('koa-passport');

module.exports = passport.authenticate('register', { session: false });
