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
import { GetProductsRequest } from '../requests/get-products.request';
import { PaginationResult } from 'src/utilities/dtos/pagination.result';
import { ProductResult } from '../results/product.result';
import { Services } from 'src/constants/services';
import { XMLServiceInterface } from '../interfaces/xml.service.interface';
import { ProductServiceInterface } from '../interfaces/product.service.interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrUpdateProductsRequest } from '../requests/create-or-update-products.request';
import { ApiKeyGuard } from 'src/utilities/security/guards/api-key.guard';
import { SecurityStrategies } from 'src/constants/security-strategies';

@ApiTags('product')
@Controller()
@ApiBearerAuth(SecurityStrategies.ApiKey)
@UseGuards(ApiKeyGuard)
export class ProductController {
  constructor(
    @Inject(Services.XMLServiceInterface)
    private readonly xmlService: XMLServiceInterface,
    @Inject(Services.ProductServiceInterface)
    private readonly productService: ProductServiceInterface,
  ) {}

  @Get('products')
  @ApiQuery({
    name: 'supplierId',
    type: Number,
    required: false,
    description: 'Tedarikçi Id (optional)',
    example: 0,
  })
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
  async getProducts(
    @Query() request: GetProductsRequest,
  ): Promise<PaginationResult<ProductResult>> {
    const result = await this.productService.getProducts(
      request.limit !== undefined
        ? parseInt(request.supplierId) ?? undefined
        : undefined,
      request.limit !== undefined ? parseInt(request.limit) ?? 50 : 50,
      request.offset !== undefined ? parseInt(request.offset) ?? 0 : 0,
    );
    return { data: result, total: result.length };
  }

  @Post('create-or-update-products-upload-file')
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
  async createOrUpdateProductsUploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    if (!this.xmlService.checkExtension(file))
      throw new BadRequestException(
        'Invalid file format. Only xlsx or xls files are allowed.',
      );
    const parsedFile = await this.xmlService.parseXmlFile(file);
    if (parsedFile == null) throw new BadRequestException('Error parsing file');
    await this.productService.fileProcessing(parsedFile);
  }

  @Post('create-or-update-products')
  @ApiBody({ type: [CreateOrUpdateProductsRequest] })
  async createProducts(@Body() data: Array<CreateOrUpdateProductsRequest>) {
    return await this.productService.createOrBulkProcessing(data);
  }
}
