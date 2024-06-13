import { LoggerModule, Params } from 'nestjs-pino';
import { LogFiles } from 'src/constants/log-files';

export const pinoLoggerOptions: Params = {
  pinoHttp: {
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: {
            destination: LogFiles.General,
            colorize: true,
            translateTime: 'SYS:standard',
          },
          level: 'info',
        },
        {
          target: 'pino-pretty',
          options: {
            destination: LogFiles.Uploads,
            colorize: true,
            translateTime: 'SYS:standard',
          },
          level: 'info',
        },
      ],
    },
  },
};

export const PinoLoggerModule = LoggerModule.forRoot(pinoLoggerOptions);
