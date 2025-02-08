import { createLogger, transports, format } from 'winston';

const schoolLogger = createLogger({
  transports: [
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

export default schoolLogger;
