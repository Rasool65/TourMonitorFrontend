import * as L from 'leaflet';

export interface IRoutingMachineLatLng {
  lat: number;
  lng: number;
  description?: string;
  onClick?: Function;
  icon?: L.Icon;
}
