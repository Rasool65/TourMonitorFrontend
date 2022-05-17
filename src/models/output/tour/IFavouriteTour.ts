import { IFavouriteDriverModel } from './IFavouriteDriverModel';
export interface IFavouriteTour {
  grouping: string;
  groupName: string;
  tours: IFavouriteDriverModel[];
}
