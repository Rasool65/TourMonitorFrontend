export interface IVehiclesResultModel {
  vin: string;
  plate: string;
  geoCoordinate: IGeoCoordinate;
  fuelLevel: number;
  address: string;
  locationAlias: string;
  locationId: number;
  parkingId: string;
  buildSeries: string;
  fuelType: string;
  primaryColor: string;
  charging: boolean;
  freeForRental: boolean;
  hardwareVersion: string;
  globalVersion: number;
}

interface IGeoCoordinate {
  latitude: number;
  longitude: number;
}
