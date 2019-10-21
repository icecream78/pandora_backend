const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const passport = require('passport');
const jwt = require('jsonwebtoken');

function generateJWT(userId = 0, login = '', role_id) {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    login,
    id: userId,
    role_id,
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
      const token = generateJWT(user.id, user.login, user.role_id);
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

async function register(req, res) {
  const { body } = req;
  // TODO: add validation to fields by type and values
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
  if (!body.role) {
    return res.status(422).json({
      errors: {
        role: 'is required',
      },
    });
  }
  if (!body.nickname) {
    return res.status(422).json({
      errors: {
        nickname: 'is required',
      },
    });
  }

  try {
    const result = await req.db.registerUser(body.login, body.password, body.nickname, body.role);
    if (!result) {
      return res.status(401).json({ ok: false });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Fail while create new user' });
  }
}

module.exports = {
  auth,
  register,
};
