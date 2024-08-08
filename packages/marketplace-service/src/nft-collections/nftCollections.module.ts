import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { NftCollectionsService } from './nftCollections.service';
import {
  NftCollectionSchema,
  NftCollections,
  NftSchema,
  Nfts,
} from '@app/shared/models';
import { NftCollectionsController } from './nftCollections.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NftCollections.name,
        schema: NftCollectionSchema,
      },
      {
        name: Nfts.name,
        schema: NftSchema,
      },
    ]),
  ],
  controllers: [NftCollectionsController],
  providers: [NftCollectionsService],
})
export class NftCollectionsModule {}
