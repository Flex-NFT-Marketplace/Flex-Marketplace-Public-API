import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  NftCollectionDocument,
  NftCollectionDto,
  NftCollections,
  Nfts,
} from '@app/shared/models';
import { Model } from 'mongoose';
import { PaginationDto } from '@app/shared/types/pagination.dto';
import { formattedContractAddress } from '@app/shared/utils';
import { NftCollectionQueryParams } from './dto/nftCollectionQuery.dto';
import { BaseResultPagination } from '@app/shared/types';
import * as _ from 'lodash';

@Injectable()
export class NftCollectionsService {
  constructor(
    @InjectModel(NftCollections.name)
    private readonly nftCollectionModel: Model<NftCollectionDocument>,
    @InjectModel(Nfts.name) private readonly nftModel: Model<Nfts>,
  ) {}
  async getListNFTCollections(
    query: NftCollectionQueryParams,
  ): Promise<BaseResultPagination<NftCollectionDto>> {
    const result = new BaseResultPagination<NftCollectionDto>();
    const { size, skipIndex, sort, page } = query;

    const count = await this.nftCollectionModel.countDocuments();

    if (count === 0 || size === 0) {
      result.data = new PaginationDto<NftCollectionDto>([], count, page, size);
      return result;
    }

    const items: NftCollectionDto[] = await this.nftCollectionModel.aggregate([
      {
        $sort: sort.reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {}),
      },
      { $skip: skipIndex },
      { $limit: size },
      {
        $project: {
          _id: 0,
          nftContract: 1,
          name: 1,
          symbol: 1,
          cover: 1,
          avatar: 1,
          description: 1,
          standard: 1,
        },
      },
    ]);

    result.data = new PaginationDto(items, count, page, size);
    return result;
  }

  async getNFTCollectionDetail(nftContract: string) {
    const formatedAddress = formattedContractAddress(nftContract);

    const data = await this.nftCollectionModel.aggregate([
      { $match: { nftContract: formatedAddress } },
      {
        $project: {
          _id: 0,
          nftContract: 1,
          name: 1,
          symbol: 1,
          cover: 1,
          avatar: 1,
          description: 1,
          standard: 1,
        },
      },
    ]);

    if (data.length == 0) {
      throw new HttpException('Collection not found', HttpStatus.NOT_FOUND);
    }
    return data[0];
  }
}
