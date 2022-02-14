import { IMapConfig } from './IMapConfig';
import * as L from 'leaflet';

const mapConfig = {
  defaultPosition: [36.47017524243053, 52.34986298203654],
  defaultZoom: 9,
  defaultMarkerIcon: new L.Icon({
    iconUrl: require('@src/assets/images/markers/marker.png'),
    iconSize: [50, 50],
    iconAnchor: [5, 30],
  }),
} as IMapConfig;

export default mapConfig;
