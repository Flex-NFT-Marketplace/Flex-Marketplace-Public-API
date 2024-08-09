import { MongooseModule } from '@nestjs/mongoose';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import configuration from '@app/shared/configuration';
import { AppLoggerMiddleware } from '@app/shared/middleware/app-logger.middleware';
import { NftModule } from './nfts/nfts.module';
import { NftCollectionsModule } from './nft-collections/nftCollections.module';
import { HistoryModule } from './activity/activity.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(configuration().db_path),
    NftModule,
    HistoryModule,
    NftCollectionsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1000, // 1s
        limit: 5,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
