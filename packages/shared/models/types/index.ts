export enum MarketType {
  OnSale = 'OnSale',
  NotForSale = 'NotForSale',
  Canceled = 'Canceled',
}
export enum NftCollectionStatus {
  Active = 'active',
  DeActive = 'deActive',
}

export enum NftCollectionStandard {
  ERC721 = 'ERC-721',
  ERC1155 = 'ERC-1155',
}

export enum NotificationStatus {
  Seen = 'Seen',
  UnSeen = 'UnSeen',
}

export enum HistoryType {
  Mint = 'mint',
  Transfer = 'transfer',
  Burn = 'burn',
  FlexDropMint = 'flexDropMint',
  WarpcastMint = 'warpcastMint',
  CancelSale = 'cancelSale',
  CancelOffer = 'cancelOffer',
  Sale = 'sale',
  Stake = 'stake',
  Unstake = 'unstake',
}
export enum SpanMsType {
  OneDay = 86400000,
  OneWeek = 604800000,
  OneMonth = 2592000000,
}

export const MAX_END_TIME_MS = 2592000000;

export type Attribute = {
  trait_type: string;
  value: any;
  display_type?: string;
};

export type AttributeMap = {
  label: string;
  trait_type: string;
  type: AttributesMapType;
  min?: number;
  max?: number;
  options?: any[];
};

export enum AttributesMapType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Object = 'object',
  Array = 'array',
}

export const BURN_ADDRESS =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

export enum TokenType {
  ETH = 'ETH',
  STRK = 'STRK',
}
