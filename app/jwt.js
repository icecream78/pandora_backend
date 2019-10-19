const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const jwt = require('express-jwt');

function getTokenFromHeaders(req) {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
}

// TODO: fix this crutch
function isRevokedCallback(req, payload, done) {
  req.user = payload;
  done(null, false);
}

const auth = {
  required: jwt({
    secret: JWT_SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    isRevoked: isRevokedCallback,
  }),
  optional: jwt({
    secret: JWT_SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;
