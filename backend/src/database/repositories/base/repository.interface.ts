import {
  FindOptions,
  CreateOptions,
  DestroyOptions,
  Includeable,
  Model,
  Attributes,
  WhereOptions,
  UpdateOptions,
  Transaction,
} from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';

export interface RepositoryInterface<T extends Model> {
  getAll(options?: FindOptions): Promise<Array<T>>;
  getById(id: string, options?: FindOptions): Promise<T>;
  create(data: any, options?: CreateOptions): Promise<T>;
  createBulk(data: Array<any>, options?: CreateOptions): Promise<Array<T>>;
  findOneById(id: string, options?: FindOptions): Promise<T | null>;
  findByCondition(
    condition: WhereOptions<Attributes<T>>,
    options?: FindOptions,
  ): Promise<Array<T>>;
  findAll(options?: FindOptions): Promise<Array<T>>;
  remove(id: string, options?: DestroyOptions): Promise<number>;
  findWithRelations(
    id: string,
    relations: Array<Includeable>,
    options?: FindOptions,
  ): Promise<T | null>;
  preload(ids: Array<string>, options?: FindOptions): Promise<Array<T>>;
  getTransaction(): Promise<Transaction>;
  update(
    data: MakeNullishOptional<T['_creationAttributes']>,
    options?: UpdateOptions,
  ): Promise<[affectedCount: number]>;
}
