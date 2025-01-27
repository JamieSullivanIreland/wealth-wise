declare interface ITransaction {
  _id: string;
  user_id: string;
  asset_id: IAsset;
  amount: number;
  createdAt: string;
  updateAt: string;
}

declare interface IAsset {
  _id: string;
  user_id: string;
  category: string;
  name: string;
  cost: number;
  value: number;
  detail: string;
  numShares: number;
  createdAt: string;
  updateAt: string;
}

declare interface ICategory {
  name: string;
  total: number;
}

declare interface INetworthResult {
  timestamp: string;
  total: number;
}

declare interface INetworth {
  prevTotal?: number;
  results: INetworthResult[];
}
