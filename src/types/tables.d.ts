declare interface IPaginatedData {
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

declare interface IPaginatedAssets extends IPaginatedData {
  assets: IAssetData[];
}

declare interface IPaginatedTransactions extends IPaginatedData {
  transactions: ITransactionData[];
}

declare interface IAssetData {
  _id: string;
  date: string;
  name: string;
  category: string;
  numShares: number;
  cost: number;
  value: number;
}

declare interface ITransactionData {
  _id: string;
  asset: IAsset;
  amount: number;
  date: string;
  updatedAt: Date;
}

declare interface ISort {
  by: string;
  order: string;
}
