import { ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const loggerConfig = require(join(process.cwd(), 'config', 'logger.config'));

export class FileLogger extends ConsoleLogger {
  private logger: winston.Logger;

  constructor(private logDir: string = `${loggerConfig.logger.logDir}`, context: string = 'App') {
    super(context);

    // CREATE DIR
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // LOG ROTATE
    this.logger = winston.createLogger({
      level: loggerConfig.logger.level,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          ({ timestamp, level, message }) => `[${timestamp}] [${level.toUpperCase()}] ${message}`,
        ),
      ),
      transports: [
        // MIXED LOGS
        new winston.transports.DailyRotateFile({
          filename: join(logDir, 'UnHogarParaTodos-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          maxSize: loggerConfig.logger.logs.maxSize,
          maxFiles: loggerConfig.logger.logs.maxFiles,
        }),
        // ERROR LOGS
        new winston.transports.DailyRotateFile({
          level: 'error',
          filename: join(logDir, 'error-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          maxSize: loggerConfig.logger.error.maxSize,
          maxFiles: loggerConfig.logger.error.maxFiles,
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    super.log(message, context);
    this.logger.info(`[LOG] ${message}`);
  }

  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context);
    this.logger.error(`[ERROR] ${message}`);
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
    this.logger.warn(`[WARN] ${message}`);
  }

  debug(message: string, context?: string) {
    super.debug(message, context);
    this.logger.debug(`[DEBUG] ${message}`);
  }

  verbose(message: string, context?: string) {
    super.verbose(message, context);
    this.logger.verbose(`[VERBOSE] ${message}`);
  }
}