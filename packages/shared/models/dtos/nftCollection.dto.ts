import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsHexadecimal,
  IsNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { NftCollectionStandard } from '../types';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class NftCollectionDto {
  @IsString()
  @Transform(({ value }) => String(value).trim())
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  symbol: string;

  @IsHexadecimal()
  @Length(66, 66)
  @Transform(({ value }) => {
    if (String(value).length == 66) {
      return String(value).toLowerCase().trim();
    }
    return String(value).toLowerCase().trim().replace('0x', '0x0');
  })
  @ApiProperty()
  nftContract: string;

  @IsUrl()
  @ApiProperty()
  cover?: string;

  @IsUrl()
  @ApiProperty()
  avatar?: string;

  @IsUrl()
  @ApiProperty()
  featuredImage?: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsEnum(NftCollectionStandard)
  @ApiProperty({ enum: NftCollectionStandard })
  standard: NftCollectionStandard;

  @IsNumber()
  @ApiProperty()
  royaltyRate?: number;

  @IsNumber()
  @ApiProperty()
  holders?: number;

  @IsNumber()
  @ApiProperty()
  supply?: number;
}
