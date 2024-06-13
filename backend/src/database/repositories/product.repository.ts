import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductRepositoryInterface } from '../interfaces/product.repository.interface';
import BaseRepository from './base/base.repository';

@Injectable()
export class ProductRepository
  extends BaseRepository<ProductEntity>
  implements ProductRepositoryInterface
{
  constructor(
    @InjectModel(ProductEntity)
    private readonly ProductModel: typeof ProductEntity,
  ) {
    super(ProductModel);
  }

  getTableName(): string {
    return this.ProductModel.getTableName() as string;
  }

  async getTableInfo(): Promise<{
    tableName: string;
    columnCount: number;
    itemCount: number;
  }> {
    const tableName = this.getTableName();
    const columnCount = Object.keys(
      await this.ProductModel.sequelize
        .getQueryInterface()
        .describeTable(tableName),
    ).length;
    const itemCount = await this.ProductModel.count();
    return {
      tableName,
      columnCount,
      itemCount,
    };
  }
}
