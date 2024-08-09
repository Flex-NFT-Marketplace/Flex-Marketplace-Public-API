import { BaseQueryParams } from '@app/shared/types/base.queryparams';
import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, IsNotEmpty, IsOptional } from 'class-validator';

export class GetListOwnerBalanceQueryDto extends BaseQueryParams {
  @ApiProperty({ required: true })
  @IsHexadecimal()
  @IsNotEmpty()
  ownerAddress: string;

  @ApiProperty({ required: false })
  @IsHexadecimal()
  @IsNotEmpty()
  @IsOptional()
  nftContract?: string;
}

export class ListBalancesDto {
  @ApiProperty()
  nftContract: string;

  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  amount: number;
}
