import { Injectable } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import * as fs from 'fs';
import * as path from 'path';
import { LogServiceInterface } from '../interfaces/log.service.interface';

@Injectable()
export class LogService implements LogServiceInterface {
  constructor(
    @InjectPinoLogger(LogService.name) private readonly logger: PinoLogger,
  ) {}

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.trace(message, ...optionalParams);
  }

  getLogs(limit: number, offset: number, fileName: string): string[] {
    const logFilePath = path.join(__dirname, '..', 'logs', `${fileName}.log`);

    if (!fs.existsSync(logFilePath)) {
      return [];
    }

    const logs = fs
      .readFileSync(logFilePath, 'utf-8')
      .split('\n')
      .filter((line) => line.trim() !== '');

    return logs.slice(offset, offset + limit);
  }
}
