import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SupplierEntity } from 'src/entities/supplier.entity';
import { SupplierRepositoryInterface } from '../interfaces/supplier.repository.interface';
import BaseRepository from './base/base.repository';

@Injectable()
export class SupplierRepository
  extends BaseRepository<SupplierEntity>
  implements SupplierRepositoryInterface
{
  constructor(
    @InjectModel(SupplierEntity)
    private readonly SupplierModel: typeof SupplierEntity,
  ) {
    super(SupplierModel);
  }

  getTableName(): string {
    return this.SupplierModel.getTableName() as string;
  }

  async getTableInfo(): Promise<{
    tableName: string;
    columnCount: number;
    itemCount: number;
  }> {
    const tableName = this.getTableName();
    const columnCount = Object.keys(
      await this.SupplierModel.sequelize
        .getQueryInterface()
        .describeTable(tableName),
    ).length;
    const itemCount = await this.SupplierModel.count();
    return {
      tableName,
      columnCount,
      itemCount,
    };
  }
}
