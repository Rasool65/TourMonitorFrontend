import { IFavouriteDriverModel } from '@src/models/output/tour/IFavouriteDriverModel';

export interface IMapReducerState {
  map?: L.Map;
  selectedTour?: IFavouriteDriverModel;
  routingControl?: L.Control;
  storeRoutingControl?: L.Control;
  storeMarkersLayer?: L.LayerGroup;
  driverRoutingControl?: L.Control;
  visitRoutingControl?: L.Control;
}
