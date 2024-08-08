import { BaseQueryParams } from '@app/shared/types/base.queryparams';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsHexadecimal,
  IsOptional,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class NftFilterQueryParams {
  @ApiProperty({ type: String, required: true })
  @IsHexadecimal()
  @IsNotEmpty()
  nftContract: string;

  @ApiProperty({ type: String, required: true, default: 1 })
  @IsString()
  @IsNotEmpty()
  tokenId: string;
}
