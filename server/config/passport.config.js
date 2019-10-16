const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const {getByEmail, getById} = require('../data/queries/users.query');
const {jwtOptions} = require('../config/jwt.config');
const cryptoHelper = require('../helpers/crypto.helper');


passport.use(
  'login',
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await getByEmail(email);
      if (!user) {
        return done({ status: 401, message: 'Incorrect email.' }, false);
      }

      return await cryptoHelper.compare(password, user.password)
        ? done(null, user)
        : done({ status: 401, message: 'Passwords do not match.' }, null, false);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    async (request, email, password, done) => {
      try {
        const userByEmail = await getByEmail(email);
        if (userByEmail) return done({status: 401, message: 'User with such email exists'}, false);
        return done(null, {
          email: email,
          password: await cryptoHelper.encrypt(password),
          firstName: request.body.firstName,
          lastName: request.body.lastName
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await getById(jwtPayload.id);
      return user ? done(null, user) : done({status: 401, message: 'Invalid token'}, null);
    } catch (err) {
      return done(err);
    }
  })
);
