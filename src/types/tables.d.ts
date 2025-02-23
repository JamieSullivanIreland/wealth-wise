declare interface IPaginatedAssets {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  assets: IAssetData[];
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

declare interface ISort {
  by: string;
  order: string;
}
