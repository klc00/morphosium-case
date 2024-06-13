import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Services } from 'src/constants/services';
import { LogServiceInterface } from '../interfaces/log.service.interface';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(Services.LogServiceInterface)
    private readonly logService: LogServiceInterface,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logService.log({
        method,
        url,
        statusCode,
        contentLength,
        userAgent,
      });
    });

    next();
  }
}
