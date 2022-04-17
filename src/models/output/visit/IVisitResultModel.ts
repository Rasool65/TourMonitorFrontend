export interface IVisitResultModel {
  tourId: string;
  customerNumber: string;
  locationLat: number;
  locationLong: number;
  visitStatus: '0' | '1' | '3' | '4';
  visitsDetails: IVisitDetailResultModel[];
}
export interface IVisitDetailResultModel {
  customerSeq: string;
  locationLong: number;
  locationLat: number;
  salesOrg: string;
  distChannel: string;
  division: string;
  createFlag: string;
  visitStatus: '0' | '1' | '3' | '4';
  visitStart: string;
  visitDuration: string;
  customerSalesWeight?: string;
  customerActivity: string;
}
