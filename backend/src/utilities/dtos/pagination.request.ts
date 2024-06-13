import { IsOptional } from 'class-validator';

export class PaginationRequest {
  @IsOptional()
  limit?: string;

  @IsOptional()
  offset?: string;
}
