const { createLogger, format, transports } = require('winston');


// TODO: move file path to env var
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'your-service-name' },
  transports: [
    new transports.File({ filename: 'pandora-lights-error.log', level: 'error' }),
    new transports.File({ filename: 'pandora-lights-combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));
}

module.exports = logger;
