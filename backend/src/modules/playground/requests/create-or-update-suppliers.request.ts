import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateSuppliersRequest {
  @ApiProperty({
    name: 'id',
    type: Number,
    required: false,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({
    name: 'taxNumber',
    type: String,
    required: true,
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  taxNumber: string;

  @ApiProperty({
    name: 'name',
    type: String,
    required: false,
    example: 'name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    name: 'contactNumber',
    type: String,
    required: false,
    example: 'contactNumber',
  })
  @IsString()
  @IsOptional()
  contactNumber?: string;

  @ApiProperty({
    name: 'address',
    type: String,
    required: false,
    example: 'address',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    name: 'email',
    type: String,
    required: false,
    example: 'email',
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    name: 'website',
    type: String,
    required: false,
    example: 'website',
  })
  @IsString()
  @IsOptional()
  website?: string;
}
