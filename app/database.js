const PASSWORD_SECRET = process.env.PASSWORD_SECRET || 'secret';

const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

const crypto = require('crypto');

// TODO: rewrite logic to SHA-256
function getPasswordHash(password) {
  const hash = crypto.createHmac('sha256', PASSWORD_SECRET)
    .update(password)
    .digest('hex');
  return hash;
}

// database logic
let connection = null;

async function initConnection(host = 'localhost', user = '', password = '', database = '') {
  // TODO: test handling error outer

  connection = await mysql.createConnection({
    host,
    user,
    database,
    password,
    Promise: bluebird,
  });
  return true;
}

// TODO: write find user logic in mysql
async function findUser(login, password) {
  const hashedPassword = getPasswordHash(password);
  const [rows] = await connection.execute('SELECT * FROM users WHERE login = ? AND password = ?', [login, hashedPassword]);
  if (rows && rows.length > 0) {
    return rows[0];
  }
  return null;
}

module.exports = {
  initConnection,
  findUser,
};
