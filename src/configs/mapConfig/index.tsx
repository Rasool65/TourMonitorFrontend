import { IMapConfig } from './IMapConfig';
import * as L from 'leaflet';

const mapConfig = {
  defaultPosition: [53.61753486, 10.02711549],
  defaultZoom: 15,
  defaultMarkerIcon: new L.Icon({
    iconUrl: require('@src/assets/images/markers/marker.png'),
    iconSize: [50, 50],
    iconAnchor: [5, 30],
  }),
} as IMapConfig;

export default mapConfig;
