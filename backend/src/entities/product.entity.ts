import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { SupplierEntity } from './supplier.entity';

@Table({
  tableName: 'products',
  timestamps: true,
  paranoid: true,
  version: true,
})
export class ProductEntity extends Model {
  @ForeignKey(() => SupplierEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  supplierId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  sku: string;

  @Column({
    type: DataType.STRING,
  })
  category: string;

  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
  })
  stock: number;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @BelongsTo(() => SupplierEntity)
  supplier: SupplierEntity;
}
