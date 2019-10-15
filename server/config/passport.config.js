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
      passReqToCallback: true
    },
    async (user, done) => {
      console.log(user);
      try {
        console.log(user);
        const userByEmail = getByEmail(user.email);
        if (userByEmail) return done({status: 401, message: 'User with such email exists'}, false);

        return done(null, {
          email: user.email,
          password: await cryptoHelper.encrypt(user.password)
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
