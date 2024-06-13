import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { XMLService } from './services/xml.service';
import { ProductService } from './services/product.service';
import { SupplierService } from './services/supplier.service';
import { SupplierRepository } from 'src/database/repositories/supplier.repository';
import { ProductRepository } from 'src/database/repositories/product.repository';

import { SequelizeModule } from '@nestjs/sequelize';
import { SupplierEntity } from 'src/entities/supplier.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { Repositories } from 'src/constants/repositories';
import { Services } from 'src/constants/services';
import { ProductController } from './controllers/product.controller';
import { SupplierController } from './controllers/supplier.controller';
import { GeneralController } from './controllers/general.controller';
import { LogService } from '../loggers/services/log.service';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([SupplierEntity, ProductEntity]),
  ],
  exports: [],
  controllers: [GeneralController, SupplierController, ProductController],
  providers: [
    {
      provide: Services.LogServiceInterface,
      useClass: LogService,
    },
    {
      provide: Services.XMLServiceInterface,
      useClass: XMLService,
    },
    {
      provide: Services.ProductServiceInterface,
      useClass: ProductService,
    },
    {
      provide: Services.SupplierServiceInterface,
      useClass: SupplierService,
    },
    {
      provide: Repositories.ProductRepositoryInterface,
      useClass: ProductRepository,
    },
    {
      provide: Repositories.SupplierRepositoryInterface,
      useClass: SupplierRepository,
    },
  ],
})
export class PlaygroundModule {}
