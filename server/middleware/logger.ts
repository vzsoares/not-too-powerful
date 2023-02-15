import expressWinston from 'express-winston';
import winston from 'winston';

const logger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/error.log',
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize(),
    winston.format.json(),
    winston.format.prettyPrint(),
  ),
});

export default logger;
