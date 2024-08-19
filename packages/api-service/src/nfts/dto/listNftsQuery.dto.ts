import { BaseQueryParams } from '@app/shared/types/base.queryparams';
import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, IsNotEmpty } from 'class-validator';

export class ListNftsFilterQueryParams extends BaseQueryParams {
  @ApiProperty({ required: true })
  @IsHexadecimal()
  @IsNotEmpty()
  nftContract: string;
}
