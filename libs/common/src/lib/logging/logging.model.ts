import * as winston from 'winston';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';
import { WinstonModule } from 'nest-winston';

const transports = {
  console: new winston.transports.Console({
    level: 'silly',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.colorize({ all: true }),
      winston.format.printf((info) => {
        return `[Nest] - ${info.service}  -- ${info.timestamp} ${info.level} [${
          info.context ? info.context : info.stack
        }] ${info.message}`;
      }),
      winston.format.align(),
    ),
  }),
  combinedFile: new winstonDailyRotateFile({
    dirname: 'logs',
    filename: 'combined',
    extension: '.log',
    level: 'info',
  }),
  errorFile: new winstonDailyRotateFile({
    dirname: 'logs',
    filename: 'error',
    extension: '.log',
    level: 'error',
  }),
};

export const initWinston = (apiTitle: string) => {
  return WinstonModule.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
    defaultMeta: { service: apiTitle },
    transports: [
      transports.console,
      transports.combinedFile,
      transports.errorFile,
    ],
  })
}

