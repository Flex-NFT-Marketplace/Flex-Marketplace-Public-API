import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { UserDocument } from './user.schema';
import { ChainDocument } from './chain.schema';
import {
  AttributeMap,
  NftCollectionStandard,
  NftCollectionStatus,
} from '../types';
import { Document, SchemaTypes } from 'mongoose';

export type NftCollectionDocument = NftCollections & Document;

export class ExternalLink {
  discord?: string;
  x?: string;
  website?: string;
  warpcastProfile?: string;
}

@Schema({ timestamps: true })
export class NftCollections extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  key?: string;

  @Prop()
  nftContract: string;

  @Prop()
  cover?: string;

  @Prop()
  avatar?: string;

  @Prop()
  featuredImage?: string;

  @Prop()
  description?: string;

  @Prop()
  contractUri?: string;

  @Prop()
  attributesMap?: AttributeMap[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Users' })
  owner?: UserDocument;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Chains' })
  chain: string;

  @Prop({ type: SchemaTypes.String, enum: NftCollectionStandard })
  standard: NftCollectionStandard;

  @Prop()
  paymentTokens: string[];

  @Prop({
    type: SchemaTypes.String,
    enum: NftCollectionStatus,
    default: NftCollectionStatus.Active,
  })
  status?: NftCollectionStatus;

  @Prop({ default: false })
  isNonFungibleFlexDropToken?: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Users' })
  creatorPayout?: UserDocument;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Users' })
  payers?: UserDocument[];

  @Prop({ default: false })
  verified?: boolean;

  @Prop()
  royaltyRate?: number;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Users' })
  collaboratories?: UserDocument[];

  @Prop()
  dropPhases?: string[];

  @Prop({ type: ExternalLink })
  externalLink?: ExternalLink;
}

export const NftCollectionSchema = SchemaFactory.createForClass(NftCollections);
NftCollectionSchema.index({ nftContract: 1 }, { unique: true });
