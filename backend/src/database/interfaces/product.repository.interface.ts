import { ProductEntity } from 'src/entities/product.entity';
import { RepositoryInterface } from '../repositories/base/repository.interface';

export interface ProductRepositoryInterface
  extends RepositoryInterface<ProductEntity> {
  getTableName(): string;
  getTableInfo(): Promise<{
    tableName: string;
    columnCount: number;
    itemCount: number;
  }>;
}
