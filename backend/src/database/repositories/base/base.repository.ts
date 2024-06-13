import {
  Model,
  FindOptions,
  CreateOptions,
  DestroyOptions,
  Includeable,
  WhereOptions,
  Attributes,
  ModelStatic,
  UpdateOptions,
  Transaction,
} from 'sequelize';
import { RepositoryInterface } from './repository.interface';
import { MakeNullishOptional } from 'sequelize/types/utils';

export default abstract class BaseRepository<T extends Model>
  implements RepositoryInterface<T>
{
  modelClass: ModelStatic<T>;

  constructor(modelClass: ModelStatic<T>) {
    this.modelClass = modelClass;
  }

  getAll(options: FindOptions = {}): Promise<Array<T>> {
    if (!options.order) {
      options = {
        ...options,
        ...this.getDefaultOrderBy().order,
      };
    }
    return this.modelClass.findAll(options);
  }

  getById(id: string, options?: FindOptions): Promise<T> {
    return this.modelClass.findByPk(id, options);
  }

  create(data: any, options?: CreateOptions): Promise<T> {
    return this.modelClass.create(data, options);
  }

  createBulk(data: Array<any>, options?: CreateOptions): Promise<Array<T>> {
    return this.modelClass.bulkCreate(data, options);
  }

  update(
    data: MakeNullishOptional<T['_creationAttributes']>,
    options?: UpdateOptions,
  ): Promise<[affectedCount: number]> {
    return this.modelClass.update(data, options);
  }

  findOneById(id: string, options?: FindOptions): Promise<T | null> {
    return this.modelClass.findOne({ where: { id }, ...options });
  }

  findByCondition(
    condition: WhereOptions<Attributes<T>>,
    options?: FindOptions,
  ): Promise<Array<T>> {
    return this.modelClass.findAll({ where: condition, ...options });
  }

  findAll(options?: FindOptions): Promise<Array<T>> {
    return this.modelClass.findAll(options);
  }

  remove(id: string, options?: DestroyOptions): Promise<number> {
    return this.modelClass.destroy({ where: { id }, ...options });
  }

  findWithRelations(
    id: string,
    relations: Array<Includeable>,
    options?: FindOptions,
  ): Promise<T | null> {
    options = {
      ...options,
      include: relations,
    };
    return this.modelClass.findByPk(id, options);
  }

  preload(ids: Array<string>, options?: FindOptions): Promise<Array<T>> {
    return this.modelClass.findAll({
      where: {
        id: ids,
      },
      ...options,
    });
  }

  async getTransaction(): Promise<Transaction> {
    return this.modelClass.sequelize.transaction();
  }

  protected getDefaultOrderBy() {
    return {
      order: [['created_at', 'DESC']],
    };
  }
}
