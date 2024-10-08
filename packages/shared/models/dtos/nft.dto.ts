import { Transform } from 'class-transformer';
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
import { Attribute, MarketType } from '../types';
import { ApiProperty } from '@nestjs/swagger';
import { NftCollectionDto } from './nftCollection.dto';
import { UserDto } from './user.dto';

export class AttributeDto implements Attribute {
  @ApiProperty()
  trait_type: string;

  @ApiProperty()
  value: any;

  @ApiProperty()
  display_type?: string;
}

export class NftDto {
  @IsNumber()
  @ApiProperty()
  tokenId: number;

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

  @ApiProperty({ type: () => NftCollectionDto })
  nftCollection: NftCollectionDto;

  @IsNumber()
  royaltyRate: number;

  @IsString()
  @ApiProperty()
  name?: string;

  @IsUrl()
  @ApiProperty()
  image: string;

  @IsUrl()
  @ApiProperty()
  originalImage: string;

  @IsUrl()
  @ApiProperty()
  animationUrl: string;

  @IsString()
  @ApiProperty()
  description: string;

  @ApiProperty()
  tokenUri: string;

  @ApiProperty()
  owner: string;

  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsArray()
  @ApiProperty({ type: () => [AttributeDto] })
  attributes: AttributeDto[];

  @IsBoolean()
  @ApiProperty()
  isBurned?: boolean;

  @IsNumber()
  @ApiProperty()
  burnedAt?: number;
}
