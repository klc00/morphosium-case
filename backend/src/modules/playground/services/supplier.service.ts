import { Inject, Injectable } from '@nestjs/common';
import { Repositories } from 'src/constants/repositories';
import { SupplierRepositoryInterface } from 'src/database/interfaces/supplier.repository.interface';
import { SupplierServiceInterface } from '../interfaces/supplier.service.interface';
import { SupplierEntity } from 'src/entities/supplier.entity';
import { CreateOrUpdateSuppliersRequest } from '../requests/create-or-update-suppliers.request';

@Injectable()
export class SupplierService implements SupplierServiceInterface {
  constructor(
    @Inject(Repositories.SupplierRepositoryInterface)
    private readonly supplierRepository: SupplierRepositoryInterface,
  ) {}

  async getSuppliers(
    limit: number = 50,
    offset: number = 0,
  ): Promise<Array<SupplierEntity>> {
    return this.supplierRepository.getAll({
      limit,
      offset,
    });
  }

  async getTableInfo() {
    return await this.supplierRepository.getTableInfo();
  }

  async fileProcessing(data: any[]) {
    const requests = data.map((m) => {
      const request = new CreateOrUpdateSuppliersRequest();
      request.id = m.id;
      request.address = m.address;
      request.contactNumber = m.contactNumber;
      request.email = m.email;
      request.name = m.name;
      request.taxNumber = m.taxNumber;
      request.website = m.website;
      return request;
    });
    await this.createOrBulkProcessing(requests);
  }

  async createOrBulkProcessing(
    data: CreateOrUpdateSuppliersRequest[],
  ): Promise<void> {
    const productsCreate = data.filter((item) => item.id === undefined);
    const productsUpdate = data.filter((item) => item.id !== undefined);

    const transaction = await this.supplierRepository.getTransaction();

    try {
      const createPromises = this.supplierRepository.createBulk(
        productsCreate,
        { transaction },
      );
      const updatePromises = productsUpdate.map((u) =>
        this.supplierRepository.update(u as any, {
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
