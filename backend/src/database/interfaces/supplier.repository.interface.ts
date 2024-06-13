import { SupplierEntity } from 'src/entities/supplier.entity';
import { RepositoryInterface } from '../repositories/base/repository.interface';

export interface SupplierRepositoryInterface
  extends RepositoryInterface<SupplierEntity> {
  getTableName(): string;
  getTableInfo(): Promise<{
    tableName: string;
    columnCount: number;
    itemCount: number;
  }>;
}
