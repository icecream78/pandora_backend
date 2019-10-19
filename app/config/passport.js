const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../database');

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password',
}, async (login, password, done) => {
  try {
    const user = await db.findUser(login, password);
    if (!user) {
      return done(null, null, { msg: 'Login or password is incorrect' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
