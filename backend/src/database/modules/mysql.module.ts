import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeModuleOptions } from '@nestjs/sequelize/dist/interfaces/sequelize-options.interface';
import { ProductEntity } from 'src/entities/product.entity';
import { SupplierEntity } from 'src/entities/supplier.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
      ): Promise<SequelizeModuleOptions> => {
        const sequelizeOptions: SequelizeModuleOptions = {
          dialect: 'mysql',
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT')),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: configService.get('DB_NAME'),
          define: {
            timestamps: false,
          },
          autoLoadModels: true,
          synchronize: true,
          models: [SupplierEntity, ProductEntity],
          logging: process.env.NODE_ENV === 'development' ? true : false,
        };
        return sequelizeOptions;
      },
      inject: [ConfigService],
    }),
  ],
})
export class MySQLDBModule {}
