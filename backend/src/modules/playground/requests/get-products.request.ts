import { IsOptional } from 'class-validator';
import { PaginationRequest } from '../../../utilities/dtos/pagination.request';

export class GetProductsRequest extends PaginationRequest {
  @IsOptional()
  supplierId?: string;
}
