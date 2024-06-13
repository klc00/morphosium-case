import { IsOptional, IsPositive } from 'class-validator';

export class ProductResult {
  @IsOptional()
  @IsPositive()
  supplierId?: number;
}
