const HOST = process.env.HOST || '0.0.0.0'; // for handling external requests
const PORT = process.env.PORT || '3000';

const logger = require('./logger');
const app = require('./app');

app.use((req, res, next) => {
  req.logger = logger;
  next();
});

app.listen(PORT, HOST, () => {
  logger.info(`Example app listening on port ${PORT}!`);
});
