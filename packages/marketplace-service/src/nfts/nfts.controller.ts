import {
  ApiTags,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
  ApiOperation,
} from '@nestjs/swagger';
import { Controller, HttpCode, Query, Get } from '@nestjs/common';
import { NftService } from './nfts.service';
import { PaginationDto } from '@app/shared/types/pagination.dto';
import { NftDto, UserDto } from '@app/shared/models';
import { BaseResult, BaseResultPagination } from '@app/shared/types';
import { ListNftsFilterQueryParams } from './dto/listNftsQuery.dto';
import { NftFilterQueryParams } from './dto/nftQuery.dto';
import { GetListHoldersDto, ListHoldersDto } from './dto/listHolders.dto';
import {
  GetListOwnerBalanceQueryDto,
  ListBalancesDto,
} from './dto/ownerBalance.dto';

@ApiTags('NFTs')
@Controller('nfts')
@ApiExtraModels(
  ListNftsFilterQueryParams,
  PaginationDto,
  NftDto,
  UserDto,
  ListHoldersDto,
  ListBalancesDto,
)
export class NftController {
  constructor(private readonly nftsService: NftService) {}
  @Get('/get-nfts')
  @ApiOperation({
    summary: 'Get list of NFTs By Query params',
    description:
      'Use this API to get the NFTs by query params include: <b>owner</b>, <b>nftContract</b>, sort, page, size.',
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
                        $ref: getSchemaPath(NftDto),
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
  async getNfts(@Query() query: ListNftsFilterQueryParams) {
    return await this.nftsService.getNftsByQuery(query);
  }

  @Get('/get-nft')
  @ApiOperation({
    summary: 'Get detail of NFT By Query params',
    description:
      'Use this API to get the NFT by query params include: <b>owner</b>, <b>nftContract</b>,<b>tokenId  </b>, sort, page, size.',
  })
  @HttpCode(200)
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
                  $ref: getSchemaPath(NftDto),
                },
              ],
            },
          },
        },
      ],
    },
  })
  async getNft(@Query() query: NftFilterQueryParams) {
    return await this.nftsService.getNftDetail(query);
  }

  @Get('get-holders')
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
                        $ref: getSchemaPath(ListHoldersDto),
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
  async getHolders(@Query() query: GetListHoldersDto) {
    return await this.nftsService.getHolders(query);
  }

  @Get('get-owner-balance')
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
                        $ref: getSchemaPath(ListBalancesDto),
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
  async getOwnerBalance(@Query() query: GetListOwnerBalanceQueryDto) {
    return await this.nftsService.getListBalaces(query);
  }
}
