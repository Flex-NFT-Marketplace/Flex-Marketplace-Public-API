import {
  ApiTags,
  ApiOperation,
  ApiExtraModels,
  getSchemaPath,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Query,
  Param,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NftCollectionsService } from './nftCollections.service';
import { BaseResult } from '@app/shared/types/base.result';
import { NftCollectionDto } from '@app/shared/models';
import { NftCollectionQueryParams } from './dto/nftCollectionQuery.dto';
import { BaseResultPagination } from '@app/shared/types';
import { isHexadecimal } from 'class-validator';

@ApiTags('NFT Collections')
@Controller('nft-collection')
@ApiExtraModels(
  NftCollectionQueryParams,
  NftCollectionDto,
  BaseResultPagination,
)
export class NftCollectionsController {
  constructor(private readonly nftCollectionService: NftCollectionsService) {}
  @Get('/get-collections')
  @ApiOperation({
    summary: 'Get List NFT Collections',
    description:
      'Use this API to get the list NFTs by query params include:<b>standard  </b>, <b>nftContract</b>,<b>chain  </b>, sort, page, size.',
  })
  @HttpCode(200)
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(BaseResultPagination),
        },
        {
          properties: {
            data: {
              allOf: [
                {
                  properties: {
                    items: {
                      type: 'array',
                      items: {
                        $ref: getSchemaPath(NftCollectionDto),
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },
  })
  async getListNFTCollections(@Query() query: NftCollectionQueryParams) {
    const data = await this.nftCollectionService.getListNFTCollections(query);
    return data;
  }
  @Get('/:nftContract')
  @ApiOperation({
    summary: 'Get  NFT Detail Collections',
  })
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(BaseResult),
        },
        {
          properties: {
            data: {
              allOf: [
                {
                  $ref: getSchemaPath(NftCollectionDto),
                },
              ],
            },
          },
        },
      ],
    },
  })
  async getNFTCollectionDetail(@Param('nftContract') nftContract: string) {
    if (!isHexadecimal(nftContract)) {
      throw new HttpException('Invalid Nft Contract', HttpStatus.BAD_REQUEST);
    }
    const data =
      await this.nftCollectionService.getNFTCollectionDetail(nftContract);
    return new BaseResult(data);
  }
}
