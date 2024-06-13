import { Column, Table, Model, HasMany, DataType } from 'sequelize-typescript';
import { ProductEntity } from './product.entity';

@Table({
  tableName: 'suppliers',
  timestamps: true,
  paranoid: true,
  version: true,
})
export class SupplierEntity extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  taxNumber: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  contactNumber: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  website: string;

  @HasMany(() => ProductEntity)
  products: ProductEntity[];
}
