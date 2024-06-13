import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateProductsRequest {
  @ApiProperty({
    name: 'id',
    type: Number,
    required: false,
    example: 1,
  })
  @IsOptional()
  id?: number;

  @ApiProperty({
    name: 'supplierId',
    type: Number,
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  supplierId: number;

  @ApiProperty({
    name: 'sku',
    type: String,
    required: true,
    example: 'sku-001',
  })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({
    name: 'name',
    type: String,
    required: false,
    example: 'Tablet',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    name: 'category',
    type: String,
    required: false,
    example: 'category',
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    name: 'price',
    type: Number,
    required: false,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    name: 'stock',
    type: Number,
    required: false,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    name: 'description',
    type: String,
    required: false,
    example: 'description',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
