declare interface ITransaction {
  _id: string;
  user_id: string;
  asset_id: string;
  amount: number;
  createdAt: string;
  updateAt: string;
}

declare interface IAsset {
  _id: string;
  user_id: string;
  category_id: string;
  name: string;
  cost: number;
  value: number;
  detail: string;
  numShares: number;
  createdAt: string;
  updateAt: string;
}

declare interface ICategory {
  _id: string;
  type: string;
}
