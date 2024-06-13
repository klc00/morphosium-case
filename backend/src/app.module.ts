import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlaygroundModule } from './modules/playground/playground.module';
import { AuthModule } from './modules/auth/auth.module';
//import { MsSQLDBModule } from './database/modules/mssqldb.module';
import { MySQLDBModule } from './database/modules/mysql.module';
import { PinoLoggerModule } from './modules/loggers/modules/pino.logger.module';

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
})
export class AppModule {}
