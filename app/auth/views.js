const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const passport = require('passport');
const jwt = require('jsonwebtoken');

function generateJWT(userId = 0, login = '') {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    login,
    id: userId,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, JWT_SECRET);
}


function auth(req, res, next) {
  const { body } = req;
  if (!body.login) {
    return res.status(422).json({
      errors: {
        login: 'is required',
      },
    });
  }
  if (!body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (user) {
      const token = generateJWT(user.id, user.login);
      return res.status(200).json({
        user: {
          nickname: user.nickname,
          login: user.login,
          role: user.role_id,
          token,
        },
      });
    }
    return res.status(400).json(info);
  })(req, res, next);
}

module.exports = {
  auth,
};
