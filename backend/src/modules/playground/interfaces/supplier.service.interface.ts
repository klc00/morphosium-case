import { SupplierEntity } from 'src/entities/supplier.entity';
import { CreateOrUpdateSuppliersRequest } from '../requests/create-or-update-suppliers.request';

export interface SupplierServiceInterface {
  getTableInfo(): Promise<{
    tableName: string;
    columnCount: number;
    itemCount: number;
  }>;
  fileProcessing(data: any[]): Promise<void>;
  createOrBulkProcessing(data: CreateOrUpdateSuppliersRequest[]): Promise<void>;
  getSuppliers(limit?: number, offset?: number): Promise<Array<SupplierEntity>>;
}
