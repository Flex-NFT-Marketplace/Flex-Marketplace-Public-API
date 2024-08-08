import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsHexadecimal,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { HistoryType } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class HistoryDto {
  @IsString()
  @ApiProperty()
  tokenId: string;

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

  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  @IsHexadecimal()
  @ApiProperty()
  txHash: string;

  @IsNumber()
  @ApiProperty()
  timestamp: number;

  @IsNumber()
  @ApiProperty()
  block: number;

  @IsEnum(HistoryType)
  @ApiProperty({ required: true, enum: HistoryType })
  type: HistoryType;
}
