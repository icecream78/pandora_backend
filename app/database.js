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

// TODO: solve problem with database reconnect
async function initConnection(host = 'localhost', user = '', password = '', database = '') {
  // TODO: test handling error outer

  connection = await mysql.createPool({
    host,
    user,
    database,
    password,
    Promise: bluebird,
  });
  return true;
}

async function findUser(login, password) {
  const poolConnection = await connection.getConnection();
  const hashedPassword = getPasswordHash(password);
  const userSearchSQL = 'SELECT * FROM users WHERE login = ? AND password = ?';
  const [rows] = await poolConnection.execute(userSearchSQL, [login, hashedPassword]);
  if (rows && rows.length > 0) {
    return rows[0];
  }
  return null;
}

// TODO: test handling commit changes error
async function insertNewLightDevice(lightInfo = {
  name: 'default', manufacturer: '0', address: '', state: 0, userId: 0,
}) {
  const poolConnection = await connection.getConnection();
  await poolConnection.beginTransaction();
  const newLightSQL = 'INSERT INTO lights(name, manufacturer_id, address, initial_state) VALUES (?, ?, ?, ?)';
  const insertInfo = [lightInfo.name, lightInfo.manufacturer, lightInfo.address, lightInfo.state];
  const [lightSQLRes] = await poolConnection.execute(newLightSQL, insertInfo);
  if (!(lightSQLRes && lightSQLRes.affectedRows > 0)) {
    poolConnection.rollback();
    return false;
  }

  const lightStateSQL = 'INSERT INTO light_switch_state(state_id, light_id, access_user_id) VALUES (?, ?, ?)';
  const lightStateInfo = [lightInfo.state, lightSQLRes.insertId, lightInfo.userId];
  const [lightStateRes] = await poolConnection.execute(lightStateSQL, lightStateInfo);
  if (!lightStateRes && lightStateRes.affectedRows > 0) {
    poolConnection.rollback();
    return false;
  }
  const commitErr = await poolConnection.commit();
  if (commitErr[1]) {
    poolConnection.rollback();
    return false;
  }
  return true;
}

async function listLightDevices(userId, page = 0, limit = 5) {
  if (!userId) {
    throw new Error('User id is required');
  }
  const offset = page * limit;
  const poolConnection = await connection.getConnection();
  const lightDevicesListSQL = `SELECT l.id, l.address, l.name as ligth_device_name, l.initial_state, m.name as manufacturer_name, light_switch_state.state_id as current_state  FROM light_switch_state
    LEFT JOIN lights l on light_switch_state.light_id = l.id
    LEFT JOIN manufacturares m on l.manufacturer_id = m.id
    WHERE light_switch_state.access_user_id = ? LIMIT ?, ?`;
  const [rows] = await poolConnection.execute(lightDevicesListSQL, [userId, offset, limit]);
  if (rows && rows.length > 0) {
    return rows;
  }
  return [];
}

async function listAllLightDevices(page = 0, limit = 5) {
  const offset = page * limit;
  const poolConnection = await connection.getConnection();
  const lightDevicesListSQL = `SELECT l.id, l.address, l.name as ligth_device_name, l.initial_state, m.name as manufacturer_name, light_switch_state.state_id as current_state  FROM light_switch_state
    LEFT JOIN lights l on light_switch_state.light_id = l.id
    LEFT JOIN manufacturares m on l.manufacturer_id = m.id
    LIMIT ?, ?`;
  const [rows] = await poolConnection.execute(lightDevicesListSQL, [offset, limit]);
  if (rows && rows.length > 0) {
    return rows[0];
  }
  return [];
}

async function triggerLightDevice(lightId, stateId) {
  if (!lightId) {
    const err = new Error('Light device id is required');
    err.code = 1;
  }
  if (!stateId) {
    const err = new Error('Device state is required');
    err.code = 2;
  }
  const poolConnection = await connection.getConnection();
  const userSearchSQL = 'UPDATE light_switch_state SET state_id = ? WHERE light_id = ?';
  const [rows] = await poolConnection.execute(userSearchSQL, [stateId, lightId]);
  return rows && rows.affectedRows > 0;
}

module.exports = {
  initConnection,
  findUser,
  insertNewLightDevice,
  listLightDevices,
  listAllLightDevices,
  triggerLightDevice,
};
