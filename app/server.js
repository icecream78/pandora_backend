// TODO: move config to separate class
const HOST = process.env.HOST || '0.0.0.0'; // for handling external requests
const PORT = process.env.PORT || '3000';
const MYSQL_HOST = process.env.MYSQL_HOST || '0.0.0.0';
const MYSQL_USER = process.env.MYSQL_USER || 'user';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'user';
const MYSQL_DB = process.env.MYSQL_DB || 'db';


const db = require('./database');
const logger = require('./logger');
const app = require('./app');

async function startServer() {
  await db.initConnection(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB);

  app.listen(PORT, HOST, () => {
    logger.info(`Example app listening on port ${PORT}!`);
  });
}


startServer();
