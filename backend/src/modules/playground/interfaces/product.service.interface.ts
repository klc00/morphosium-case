import { ProductEntity } from 'src/entities/product.entity';
import { CreateOrUpdateProductsRequest } from '../requests/create-or-update-products.request';

export interface ProductServiceInterface {
  getTableInfo(): Promise<{
    tableName: string;
    columnCount: number;
    itemCount: number;
  }>;
  fileProcessing(data: any[]): Promise<void>;
  createOrBulkProcessing(data: CreateOrUpdateProductsRequest[]): Promise<void>;
  getProducts(
    supplierId?: number,
    limit?: number,
    offset?: number,
  ): Promise<Array<ProductEntity>>;
}
