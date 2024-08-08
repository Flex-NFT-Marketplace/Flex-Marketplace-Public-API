import { Socials } from '../schemas';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsHexadecimal,
  IsObject,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsHexadecimal()
  @Length(66, 66)
  @Transform(({ value }) => {
    if (String(value).length == 66) {
      return String(value).toLowerCase().trim();
    }
    return String(value).toLowerCase().trim().replace('0x', '0x0');
  })
  @ApiProperty()
  address: string;
}
