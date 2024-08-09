import { InjectModel } from '@nestjs/mongoose';
import { NftDocument, NftDto, Nfts } from '@app/shared/models';
import { PaginationDto } from '@app/shared/types/pagination.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { formattedContractAddress } from '@app/shared/utils';
import { BaseResult, BaseResultPagination } from '@app/shared/types';
import { ListNftsFilterQueryParams } from './dto/listNftsQuery.dto';
import { NftFilterQueryParams } from './dto/nftQuery.dto';
import { GetListHoldersDto } from './dto/listHolders.dto';
import {
  GetListOwnerBalanceQueryDto,
  ListBalancesDto,
} from './dto/ownerBalance.dto';
@Injectable()
export class NftService {
  constructor(
    @InjectModel(Nfts.name)
    private readonly nftModel: Model<NftDocument>,
    private readonly userService: UserService,
  ) {}

  async getNftsByQuery(
    query: ListNftsFilterQueryParams,
  ): Promise<BaseResultPagination<NftDto>> {
    const result = new BaseResultPagination<NftDto>();
    const { page, size, skipIndex, sort } = query;

    let filter: any = {};

    filter.amount = { $gt: 0 };
    const count = await this.nftModel.countDocuments(filter);

    if (count === 0 || query.size === 0) {
      result.data = new PaginationDto([], count, query.page, query.size);
      return result;
    }
    const items = await this.nftModel.aggregate([
      {
        $match: filter,
      },
      {
        $sort: sort.reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {}),
      },
      {
        $skip: skipIndex,
      },
      {
        $limit: size,
      },
      {
        $lookup: {
          from: 'users',
          let: { owner: '$owner' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$owner', '$_id'],
                },
              },
            },
            {
              $project: {
                _id: 0,
                address: 1,
              },
            },
          ],
          as: 'owner',
        },
      },
      {
        $unwind: '$owner',
      },
      {
        $lookup: {
          from: 'nftcollections',
          let: { nftContract: '$nftContract' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$$nftContract', '$nftContract'] },
              },
            },
            {
              $project: {
                _id: 0,
                name: 1,
                symbol: 1,
                cover: 1,
                avatar: 1,
                description: 1,
                standard: 1,
              },
            },
          ],
          as: 'nftCollection',
        },
      },
      {
        $unwind: '$nftCollection',
      },
      {
        $project: {
          _id: 0,
          chain: 0,
          blockTime: 0,
          creator: 0,
          marketType: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
      {
        $replaceWith: {
          $mergeObjects: ['$$ROOT', { owner: '$owner.address' }],
        },
      },
    ]);

    result.data = new PaginationDto(items, count, query.page, query.size);

    return result;
  }

  async getNftDetail(query: NftFilterQueryParams) {
    const { nftContract, tokenId } = query;

    let filter: any = {};
    filter.nftContract = formattedContractAddress(nftContract);
    filter['$or'] = [{ tokenId }, { tokenId: Number(tokenId) }];

    const item = await this.nftModel.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: 'users',
          let: { owner: '$owner' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$owner', '$_id'],
                },
              },
            },
            {
              $project: {
                _id: 0,
                address: 1,
              },
            },
          ],
          as: 'owner',
        },
      },
      {
        $unwind: '$owner',
      },
      {
        $lookup: {
          from: 'nftcollections',
          let: { nftContract: '$nftContract' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$$nftContract', '$nftContract'] },
              },
            },
            {
              $project: {
                _id: 0,
                name: 1,
                symbol: 1,
                cover: 1,
                avatar: 1,
                description: 1,
                standard: 1,
              },
            },
          ],
          as: 'nftCollection',
        },
      },
      {
        $unwind: '$nftCollection',
      },
      {
        $project: {
          _id: 0,
          chain: 0,
          blockTime: 0,
          creator: 0,
          marketType: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
      {
        $replaceWith: {
          $mergeObjects: ['$$ROOT', { owner: '$owner.address' }],
        },
      },
    ]);

    if (item.length == 0) {
      throw new HttpException('NFT not found', HttpStatus.NOT_FOUND);
    }

    return new BaseResult(item[0]);
  }

  async getHolders(query: GetListHoldersDto) {
    const result = new BaseResultPagination<NftDto>();
    const { nftContract, page, size, skipIndex, sort } = query;

    const filter: any = {};
    filter.nftContract = formattedContractAddress(nftContract);
    filter['$or'] = [{ amount: { $gt: 0 } }, { isBurned: false }];

    const total = await this.nftModel.countDocuments(filter);
    if (total === 0) {
      result.data = new PaginationDto([], total, page, size);
      return result;
    }

    const items = await this.nftModel.aggregate([
      { $match: filter },
      {
        $sort: sort.reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {}),
      },
      {
        $skip: skipIndex,
      },
      {
        $limit: size,
      },
      {
        $lookup: {
          from: 'users',
          let: { owner: '$owner' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$owner', '$_id'],
                },
              },
            },
            {
              $project: {
                _id: 0,
                address: 1,
              },
            },
          ],
          as: 'owner',
        },
      },
      {
        $unwind: '$owner',
      },
      {
        $project: {
          _id: 0,
          nftContract: 1,
          tokenId: 1,
          owner: 1,
          amount: 1,
        },
      },
      {
        $replaceWith: {
          $mergeObjects: ['$$ROOT', { owner: '$owner.address' }],
        },
      },
    ]);

    result.data = new PaginationDto(items, total, query.page, query.size);

    return result;
  }

  async getListBalaces(query: GetListOwnerBalanceQueryDto) {
    const result = new BaseResultPagination<ListBalancesDto>();
    const { page, size, skipIndex, sort } = query;

    let filter: any = {};
    const user = await this.userService.getOrCreateUser(
      formattedContractAddress(query.ownerAddress),
    );
    filter.owner = user._id;

    if (query.nftContract) {
      filter.nftContract = formattedContractAddress(query.nftContract);
    }

    const count = await this.nftModel.countDocuments(filter);

    if (count === 0 || query.size === 0) {
      result.data = new PaginationDto([], count, query.page, query.size);
      return result;
    }

    const items = await this.nftModel.aggregate([
      { $match: filter },
      {
        $sort: sort.reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {}),
      },
      {
        $skip: skipIndex,
      },
      {
        $limit: size,
      },
      {
        $lookup: {
          from: 'users',
          let: { owner: '$owner' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$owner', '$_id'],
                },
              },
            },
            {
              $project: {
                _id: 0,
                address: 1,
              },
            },
          ],
          as: 'owner',
        },
      },
      {
        $unwind: '$owner',
      },
      {
        $project: {
          _id: 0,
          nftContract: 1,
          tokenId: 1,
          owner: 1,
          amount: 1,
        },
      },
      {
        $replaceWith: {
          $mergeObjects: ['$$ROOT', { owner: '$owner.address' }],
        },
      },
    ]);

    result.data = new PaginationDto(items, count, page, size);

    return result;
  }
}
