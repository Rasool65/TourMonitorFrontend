import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { IRoutingMachineLatLng } from './IRoutingMachineLatLng';

const defaultMarkerIcon = L.icon({
  iconUrl: require('@src/assets/images/markers/marker.png'),
  iconSize: [40, 40],
  iconAnchor: [10, 20],
  popupAnchor: [10, -5],
});

const defaultMarkerPointIcon = L.icon({
  iconUrl: require('@src/assets/images/markers/marker-point.png'),
  iconSize: [30, 30],
  iconAnchor: [10, 20],
  popupAnchor: [5, -3],
});

export const createRoutineMachineLayer = (
  items: IRoutingMachineLatLng[],
  routingServer?: string,
  startMarkerIcon?: L.Icon,
  endMarkerIcon?: L.Icon,
  pointMarkerIcon?: L.Icon,
  fitSelectedRoutes: boolean = true,
  lineColor: string = '#3593ff'
) => {
  let plan: L.LatLng[] = [];
  items.map((item) => {
    plan.push(L.latLng(item.lat, item.lng));
  });
  if (startMarkerIcon == undefined) startMarkerIcon = defaultMarkerIcon;
  if (endMarkerIcon == undefined) endMarkerIcon = defaultMarkerIcon;
  if (pointMarkerIcon == undefined) pointMarkerIcon = defaultMarkerPointIcon;
  const instance = L.Routing.control({
    routeLine: (route: any) => {
      let line = L.Routing.line(route, {
        styles: [
          { color: '#3a3a3a', opacity: 0.9, weight: 8 },
          { color: lineColor, opacity: 1, weight: 4 },
        ],
        extendToWaypoints: false,
        missingRouteTolerance: 100,
        addWaypoints: false,
      });
      return line;
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: false,
    fitSelectedRoutes: fitSelectedRoutes,
    showAlternatives: false,
    autoRoute: true,
    collapsible: false,
    containerClassName: 'hide',
    router: new L.Routing.OSRMv1({
      serviceUrl: routingServer == undefined ? '//routing.openstreetmap.de/routed-bike/route/v1/' : routingServer,
      profile: routingServer == undefined ? 'driving' : '',
    }),
    plan: new L.Routing.Plan(plan, {
      createMarker: function (i: number, waypoint: L.Routing.Waypoint, n: number) {
        const item = items[i];
        const startMarker = L.marker(waypoint.latLng, {
          draggable: false,
          icon: item.icon ? item.icon : startMarkerIcon,
        }).on('click', function () {
          if (item.onClick) item.onClick();
        });
        const endMarker = L.marker(waypoint.latLng, {
          draggable: false,
          icon: item.icon ? item.icon : endMarkerIcon,
        }).on('click', function () {
          if (item.onClick) item.onClick();
        });
        const markerPoint = L.marker(waypoint.latLng, {
          draggable: false,
          icon: item.icon ? item.icon : pointMarkerIcon,
        }).on('click', function () {
          if (item.onClick) item.onClick();
        });
        if (i === 0) return item.description == undefined ? startMarker : startMarker.bindPopup(item.description ?? '');
        else if (i === n - 1) return item.description == undefined ? endMarker : endMarker.bindPopup(item.description ?? '');
        return item.description == undefined ? markerPoint : markerPoint.bindPopup(item.description ?? '');
      },
    }),
  });
  return instance;
};
