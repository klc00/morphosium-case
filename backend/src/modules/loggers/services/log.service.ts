import { Injectable } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { LogFiles } from 'src/constants/log-files';
import * as fs from 'fs';
import * as path from 'path';
import { LogServiceInterface } from '../interfaces/log.service.interface';

@Injectable()
export class LogService implements LogServiceInterface {
  constructor(
    @InjectPinoLogger(LogService.name) private readonly logger: PinoLogger,
  ) {}

  logGeneral(message: string, context?: string): void {
    this.logger.info(message, { context });
  }

  logUpload(message: string, context?: string): void {
    this.logger.info(message, { context, target: LogFiles.Uploads });
  }

  logError(message: string, context?: string): void {
    this.logger.error(message, { context });
  }

  getUploadLogs(limit: number, offset: number): string[] {
    const logFilePath = path.join(__dirname, '..', 'logs', 'uploads.log');

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
