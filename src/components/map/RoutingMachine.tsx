import * as L from 'leaflet';
import 'leaflet-routing-machine';

export const createRoutineMachineLayer = (plan: L.LatLng[]) => {
  const instance = L.Routing.control({
    lineOptions: {
      styles: [
        { color: '#3a3a3a', opacity: 0.9, weight: 8 },
        { color: '#3593ff', opacity: 1, weight: 4 },
      ],
      extendToWaypoints: false,
      missingRouteTolerance: 100,
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
    autoRoute: true,
    collapsible: false,
    containerClassName: 'hide',
    plan: new L.Routing.Plan(plan, {
      createMarker: function (i: number, waypoint: L.Routing.Waypoint, n: number) {
        const marker = L.marker(waypoint.latLng, {
          draggable: false,
          icon: L.icon({
            iconUrl: require('@src/assets/images/markers/marker.png'),
            iconSize: [40, 40],
            iconAnchor: [10, 20],
            popupAnchor: [10, -5],
          }),
        });
        const markerPoint = L.marker(waypoint.latLng, {
          draggable: false,
          icon: L.icon({
            iconUrl: require('@src/assets/images/markers/marker-point.png'),
            iconSize: [30, 30],
            iconAnchor: [10, 20],
            popupAnchor: [5, -3],
          }),
        }).on('click', function () {
          alert(waypoint.latLng);
        });
        if (i === 0) return marker.bindPopup('Start 11:35 AM');
        else if (i === n - 1) return marker.bindPopup('End 02:35 PM');
        return markerPoint.bindPopup('11:45');
      },
    }),
  });
  return instance;
};
