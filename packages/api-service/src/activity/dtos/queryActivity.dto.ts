import { HistoryType } from '@app/shared/models';
import { BaseQueryParams } from '@app/shared/types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsHexadecimal,
  IsOptional,
  IsEnum,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryHistoriesDto extends BaseQueryParams {
  @ApiProperty({ required: true })
  @IsString()
  tokenId: string;

  @ApiProperty({ required: true })
  @IsHexadecimal()
  nftContract: string;

  @ApiProperty({ required: false, nullable: true })
  @IsHexadecimal()
  @IsOptional()
  userAddress?: string;

  @ApiProperty({
    required: false,
    nullable: true,
    isArray: true,
    type: [HistoryType],
    enum: HistoryType,
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @IsArray()
  @IsEnum(HistoryType, { each: true })
  @IsOptional()
  types?: HistoryType[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  fromBlock?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  toBlock?: number;
}
