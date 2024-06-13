import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetSuppliersRequest } from '../requests/get-suppliers.request';
import { SupplierResult } from '../results/supplier.result';
import { PaginationResult } from 'src/utilities/dtos/pagination.result';
import { Services } from 'src/constants/services';
import { XMLServiceInterface } from '../interfaces/xml.service.interface';
import { SupplierServiceInterface } from '../interfaces/supplier.service.interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrUpdateSuppliersRequest } from '../requests/create-or-update-suppliers.request';
import { ApiKeyGuard } from 'src/utilities/security/guards/api-key.guard';
import { SecurityStrategies } from 'src/constants/security-strategies';

@ApiTags('supplier')
@Controller()
@ApiBearerAuth(SecurityStrategies.ApiKey)
@UseGuards(ApiKeyGuard)
export class SupplierController {
  constructor(
    @Inject(Services.XMLServiceInterface)
    private readonly xmlService: XMLServiceInterface,
    @Inject(Services.SupplierServiceInterface)
    private readonly supplierService: SupplierServiceInterface,
  ) {}

  @Get('suppliers')
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Sayfa numarası',
    example: 0,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Sayfa başına kayıt limiti',
    example: 50,
  })
  async getSuppliers(
    @Query() request: GetSuppliersRequest,
  ): Promise<PaginationResult<SupplierResult>> {
    const result = await this.supplierService.getSuppliers(
      request.limit !== undefined ? parseInt(request.limit) ?? 50 : 50,
      request.offset !== undefined ? parseInt(request.offset) ?? 0 : 0,
    );
    return { data: result, total: result.length };
  }

  @Post('create-or-update-suppliers-upload-file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    description: 'Yüklenen dosya',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async createOrUpdateSuppliersUploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    this.xmlService.checkExtension(file);

    const parsedFile = await this.xmlService.parseXmlFile(file);
    this.supplierService.fileProcessing(parsedFile);
  }

  @Post('create-or-update-suppliers')
  @ApiBody({ type: [CreateOrUpdateSuppliersRequest] })
  async createSuppliers(@Body() data: Array<CreateOrUpdateSuppliersRequest>) {
    return await this.supplierService.createOrBulkProcessing(data);
  }
}
