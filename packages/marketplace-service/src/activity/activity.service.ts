import {
  ChainDocument,
  Chains,
  Histories,
  HistoryDocument,
  HistoryDto,
  UserDocument,
  Users,
} from '@app/shared/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryHistoriesDto } from './dtos/queryActivity.dto';
import { BaseResultPagination } from '@app/shared/types';
import { formattedContractAddress } from '@app/shared/utils';
import { PaginationDto } from '@app/shared/types/pagination.dto';
import { Web3Service } from '@app/web3-service/web3.service';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(Histories.name)
    private readonly historyModel: Model<HistoryDocument>,
    @InjectModel(Users.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Chains.name)
    private readonly chainModel: Model<ChainDocument>,
    private readonly web3Sevice: Web3Service,
  ) {}

  async getHistories(
    params: QueryHistoriesDto,
  ): Promise<BaseResultPagination<HistoryDto>> {
    const result = new BaseResultPagination<HistoryDto>();
    const {
      size,
      skipIndex,
      sort,
      page,
      tokenId,
      nftContract,
      userAddress,
      types,
      fromBlock,
      toBlock,
    } = params;

    const query: any = {};
    if (tokenId) query['$or'] = [{ tokenId }, { tokenId: Number(tokenId) }];
    if (nftContract) query.nftContract = nftContract;
    if (userAddress) {
      const userDocument = await this.userModel.findOne({
        address: formattedContractAddress(userAddress),
      });
      query.$or = [{ from: userDocument._id }, { to: userDocument._id }];
    }
    if (types && types.length > 0) query.type = { $in: types };
    const chainDocument = await this.chainModel.findOne();
    if (fromBlock) {
      const blockTime = await this.web3Sevice.getBlockTime(
        chainDocument.rpc,
        fromBlock,
      );
      query.timestamp = { $gte: blockTime };
    }

    if (toBlock) {
      const blockTime = await this.web3Sevice.getBlockTime(
        chainDocument.rpc,
        toBlock,
      );
      query.timestamp = { $lte: blockTime };
    }

    const totalItem = await this.historyModel.countDocuments(query);

    if (size === 0) {
      result.data = new PaginationDto<HistoryDto>([], totalItem, page, size);
      return result;
    }

    const items = await this.historyModel.aggregate([
      { $match: query },
      { $sort: { timestamp: -1 } },
      { $skip: skipIndex },
      { $limit: size },
      {
        $lookup: {
          from: 'users',
          localField: 'from',
          foreignField: '_id',
          as: 'from',
        },
      },
      { $unwind: { path: '$from', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'to',
          foreignField: '_id',
          as: 'to',
        },
      },
      { $unwind: { path: '$to', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          transactionHash: '$txHash',
          index: 1,
          nftContract: 1,
          tokenId: 1,
          amount: 1,
          price: 1,
          from: '$from.address',
          to: '$to.address',
          timestamp: 1,
          type: 1,
        },
      },
    ]);

    for (const tx of items) {
      const transactionDetail = await this.web3Sevice.getTransaction(
        chainDocument.rpc,
        tx.transactionHash,
      );
      tx.block = transactionDetail.result.block_number;
    }

    result.data = new PaginationDto<HistoryDto>(items, totalItem, page, size);

    return result;
  }
}
