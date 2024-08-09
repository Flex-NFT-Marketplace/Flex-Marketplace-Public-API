import { BaseQueryParams } from '@app/shared/types/base.queryparams';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsHexadecimal,
  IsOptional,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class GetListHoldersDto extends BaseQueryParams {
  @ApiProperty({ required: true })
  @IsHexadecimal()
  @IsNotEmpty()
  nftContract: string;
}

export class ListHoldersDto {
  @ApiProperty()
  nftContract: string;

  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  amount: number;
}
