import type { ObjectId } from 'mongoose';

declare interface IAssetData {
  _id: ObjectId;
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
