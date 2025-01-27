declare interface ICategoryColors {
  accounts: string;
  stocks: string;
  crypto: string;
  realEstate: string;
  cars: string;
  other: string;
}

// declare interface ISeries {
//   x: string;
//   y: string;
// }

declare type ISeries = ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
