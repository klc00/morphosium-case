import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { Services } from 'src/constants/services';
import { ProductServiceInterface } from '../interfaces/product.service.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SupplierServiceInterface } from '../interfaces/supplier.service.interface';
import { LogServiceInterface } from 'src/modules/loggers/interfaces/log.service.interface';
import { ApiKeyGuard } from 'src/utilities/security/guards/api-key.guard';
import { SecurityStrategies } from 'src/constants/security-strategies';

@ApiTags('general')
@Controller()
@ApiBearerAuth(SecurityStrategies.ApiKey)
@UseGuards(ApiKeyGuard)
export class GeneralController {
  constructor(
    @Inject(Services.ProductServiceInterface)
    private readonly productService: ProductServiceInterface,
    @Inject(Services.SupplierServiceInterface)
    private readonly supplierService: SupplierServiceInterface,
    @Inject(Services.LogServiceInterface)
    private readonly logService: LogServiceInterface,
  ) {}

  @Get('tables')
  async getAllTable() {
    const [productTableInfo, supplierTableInfo] = await Promise.all([
      this.productService.getTableInfo(),
      this.supplierService.getTableInfo(),
    ]);
    return [productTableInfo, supplierTableInfo];
  }
}
