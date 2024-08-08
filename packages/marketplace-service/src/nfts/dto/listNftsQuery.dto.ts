import { BaseQueryParams } from '@app/shared/types/base.queryparams';
import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, IsOptional, IsNotEmpty } from 'class-validator';

export class ListNftsFilterQueryParams extends BaseQueryParams {
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  @IsHexadecimal()
  @IsNotEmpty()
  ownerAddress?: string;

  @ApiProperty({ required: true })
  @IsHexadecimal()
  @IsNotEmpty()
  nftContract: string;
}
