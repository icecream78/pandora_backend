const PASSWORD_SECRET = process.env.PASSWORD_SECRET || 'secret';

const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

const crypto = require('crypto');

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

async function findUser(login, password) {
  const hashedPassword = getPasswordHash(password);
  const userSearchSQL = 'SELECT * FROM users WHERE login = ? AND password = ?';
  const [rows] = await connection.execute(userSearchSQL, [login, hashedPassword]);
  if (rows && rows.length > 0) {
    return rows[0];
  }
  return null;
}

async function insertNewLightDevice(lightInfo = {
  name: 'default', manufacturer: '0', address: '', state: 0,
}) {
  const newLightSQL = 'INSERT INTO lights(name, manufacturer_id, address, initial_state) VALUES (?, ?, ?, ?)';
  const insertInfo = [lightInfo.name, lightInfo.manufacturer, lightInfo.address, lightInfo.state];
  const [res] = await connection.execute(newLightSQL, insertInfo);
  return res && res.affectedRows > 0;
}

module.exports = {
  initConnection,
  findUser,
  insertNewLightDevice,
};
