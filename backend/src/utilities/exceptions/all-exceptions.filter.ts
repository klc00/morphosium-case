import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Services } from 'src/constants/services';
import { LogServiceInterface } from 'src/modules/loggers/interfaces/log.service.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(Services.LogServiceInterface)
    private readonly logService: LogServiceInterface,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: (exception as any).message || 'Internal server error' };

    this.logService.error({
      status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
