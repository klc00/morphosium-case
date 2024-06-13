import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlaygroundModule } from './modules/playground/playground.module';
import { AuthModule } from './modules/auth/auth.module';
//import { MsSQLDBModule } from './database/modules/mssqldb.module';
import { MySQLDBModule } from './database/modules/mysql.module';
import { PinoLoggerModule } from './modules/loggers/modules/pino.logger.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utilities/exceptions/all-exceptions.filter';
import { Services } from './constants/services';
import { LogService } from './modules/loggers/services/log.service';
import { LoggerMiddleware } from './modules/loggers/middlewares/logger.middleware';

@Module({
  imports: [
    PinoLoggerModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
      isGlobal: true,
    }),

    //MsSQLDBModule,
    MySQLDBModule,
    AuthModule,
    PlaygroundModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: Services.LogServiceInterface,
      useClass: LogService,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
