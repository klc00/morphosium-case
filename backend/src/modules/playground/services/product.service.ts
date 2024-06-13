import { Inject, Injectable } from '@nestjs/common';
import { Repositories } from 'src/constants/repositories';
import { ProductRepositoryInterface } from 'src/database/interfaces/product.repository.interface';
import { ProductServiceInterface } from '../interfaces/product.service.interface';
import { ProductEntity } from 'src/entities/product.entity';
import { CreateOrUpdateProductsRequest } from '../requests/create-or-update-products.request';

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @Inject(Repositories.ProductRepositoryInterface)
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async getProducts(
    supplierId?: number,
    limit: number = 50,
    offset: number = 0,
  ): Promise<Array<ProductEntity>> {
    const whereCondition: any = {};

    if (supplierId) {
      whereCondition.supplierId = supplierId;
    }

    return this.productRepository.getAll({
      where: whereCondition,
      limit,
      offset,
    });
  }

  async getTableInfo() {
    return await this.productRepository.getTableInfo();
  }

  async fileProcessing(data: any[]) {
    const requests = data.map((m) => {
      const request = new CreateOrUpdateProductsRequest();
      request.id = m.id;
      request.sku = m.sku;
      request.supplierId = m.supplierId;
      request.name = m.name;
      request.category = m.category;
      request.price = m.price;
      request.stock = m.stock;
      request.description = m.description;
      return request;
    });
    await this.createOrBulkProcessing(requests);
  }

  async createOrBulkProcessing(
    data: CreateOrUpdateProductsRequest[],
  ): Promise<void> {
    const productsCreate = data.filter((item) => item.id === undefined);
    const productsUpdate = data.filter((item) => item.id !== undefined);

    const transaction = await this.productRepository.getTransaction();

    try {
      const createPromises = this.productRepository.createBulk(productsCreate, {
        transaction,
      });
      const updatePromises = productsUpdate.map((u) =>
        this.productRepository.update(u as any, {
          where: { id: u.id },
          transaction,
        }),
      );
      await Promise.all([createPromises, ...updatePromises]);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new Error('Transaction rolled back due to error.');
    }
  }
}
