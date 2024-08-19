import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { HistoryService } from './activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChainSchema,
  Chains,
  Histories,
  HistorySchema,
  NftSchema,
  Nfts,
  UserSchema,
  Users,
} from '@app/shared/models';
import { Web3Service } from '@app/web3-service/web3.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Histories.name, schema: HistorySchema },
      { name: Users.name, schema: UserSchema },
      { name: Nfts.name, schema: NftSchema },
      { name: Chains.name, schema: ChainSchema },
    ]),
  ],
  providers: [HistoryService, Web3Service],
  controllers: [ActivityController],
})
export class HistoryModule {}
