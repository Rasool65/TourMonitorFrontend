import { IRoutingMachineLatLng } from '@src/components/map/IRoutingMachineLatLng';
import { createRoutineMachineLayer } from '@src/components/map/RoutingMachine';
import { APIURL_GET_CUSTOMER_LIST } from '@src/configs/apiConfig/apiUrls';
import { ICustomerResultModel } from '@src/models/output/customer/ICustomerResultModel';
import IDriverResultModel from '@src/models/output/driver/IDriverResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IVisitResultModel } from '@src/models/output/visit/IVisitResultModel';
import {
  setStoreMarkersLayer,
  setRoutingControl,
  setStoreRoutingControl,
  setDriverRoutingControl,
  setVisitRoutingControl,
} from '@src/redux/reducers/mapReducer';
import { setVisitSelected } from '@src/redux/reducers/tourVisitSelectionReducer';
import { RootStateType } from '@src/redux/Store';
import * as L from 'leaflet';
import { latLngBounds } from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import useHttpRequest from './useHttpRequest';

const defaultMarkerIcon: L.Icon = new L.Icon({
  iconUrl: require('@src/assets/images/markers/marker.png'),
  iconSize: [44, 44],
  iconAnchor: [25, 50],
  popupAnchor: [0, -26],
});

const storeMarkerIcon: L.Icon = new L.Icon({
  iconUrl: require('@src/assets/images/markers/marker-store.png'),
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -26],
});
const driverPointMarkerIcon: L.Icon = new L.Icon({
  iconUrl: require('@src/assets/images/markers/marker-point.png'),
  iconSize: [44, 44],
  iconAnchor: [25, 50],
  popupAnchor: [0, -26],
});
const driverMarkerIcon: L.Icon = new L.Icon({
  iconUrl: require('@src/assets/images/markers/marker-driver-end.png'),
  iconSize: [44, 44],
  iconAnchor: [25, 50],
  popupAnchor: [0, -26],
});
const startDriverMarkerIcon: L.Icon = new L.Icon({
  iconUrl: require('@src/assets/images/markers/marker-driver-start.png'),
  iconSize: [44, 44],
  iconAnchor: [25, 50],
  popupAnchor: [0, -26],
});
const visitDefaultMarkerIcon: L.Icon = new L.Icon({
  iconUrl: require('@src/assets/images/markers/marker-visit.svg'),
  iconSize: [44, 44],
  iconAnchor: [25, 50],
  popupAnchor: [0, -26],
});

const customVisitIcon: any = (text: string, status: string) => {
  return new L.DivIcon({
    className: 'custom-map-icon',
    popupAnchor: [0, -26],
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    html:
      '<img src="' + require('@src/assets/images/markers/marker-status-' + status + '.png') + '"/>' + '<span>' + text + '</span>',
  });
};

const customCustomerIcon: any = (text: string) => {
  return new L.DivIcon({
    className: 'custom-customer-map-icon',
    popupAnchor: [0, -26],
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    html: '<img src="' + require('@src/assets/images/markers/marker-store.png') + '"/>' + '<span>' + text + '</span>',
  });
};

export const useMap = () => {
  const mapState = useSelector((state: RootStateType) => state.map);
  const dispatch = useDispatch();
  const createRouting = (plan: L.LatLng[]) => {
    if (mapState.map != undefined) {
      const map = mapState.map;
      if (mapState.routingControl != undefined) map.removeControl(mapState.routingControl);
      // dispatch(setRoutingControl(createRoutineMachineLayer(plan).addTo(map)));
    }
  };
  const setStoreMarkers = (data: ICustomerResultModel[], icon?: L.Icon) => {
    if (mapState.map != undefined) {
      if (icon == undefined) icon = storeMarkerIcon;
      const map = mapState.map;
      if (mapState.storeMarkersLayer != undefined) map.removeLayer(mapState.storeMarkersLayer);
      var markerLayer = new L.LayerGroup();
      let bounds = latLngBounds([]);
      data.map((item) => {
        let marker = L.marker(L.latLng(item.locationLatit, item.locationLong), {
          draggable: false,
          icon: icon,
        }).on('click', () => {
          // alert('click');
        });
        marker.bindPopup(item.customerName + ' - ' + item.customerNumber);
        markerLayer.addLayer(marker);
        bounds.extend([item.locationLatit, item.locationLong]);
      });
      markerLayer.addTo(map);
      dispatch(setStoreMarkersLayer(markerLayer));
      map.fitBounds(bounds);
    }
  };
  const createStoreRouting = (data: ICustomerResultModel[], routingServer?: string) => {
    if (mapState.map != undefined) {
      const map = mapState.map;
      if (mapState.storeRoutingControl != undefined) map.removeControl(mapState.storeRoutingControl);
      let items: IRoutingMachineLatLng[] = [];
      data.map((i, index) => {
        let icon = storeMarkerIcon;
        icon = customCustomerIcon(index + 1);
        items.push({
          lat: i.locationLatit,
          lng: i.locationLong,
          description: i.customerNumber + ' - ' + i.customerName,
          icon: icon,
        });
      });
      dispatch(
        setStoreRoutingControl(
          createRoutineMachineLayer(
            items,
            routingServer,
            storeMarkerIcon,
            storeMarkerIcon,
            storeMarkerIcon,
            true,
            '#13b92a'
          ).addTo(map)
        )
      );
    }
  };

  const createDriverRouting = (data: IDriverResultModel[], routingServer?: string, fitSelectedRoutes: boolean = true) => {
    if (mapState.map != undefined) {
      const map = mapState.map;
      if (mapState.driverRoutingControl != undefined) map.removeControl(mapState.driverRoutingControl);
      let items: IRoutingMachineLatLng[] = [];
      data.map((item, index) => {
        items.push({ lat: item.locationLatit, lng: item.locationLong });
      });
      dispatch(
        setDriverRoutingControl(
          createRoutineMachineLayer(
            items,
            routingServer,
            startDriverMarkerIcon,
            driverMarkerIcon,
            driverPointMarkerIcon,
            fitSelectedRoutes
          ).addTo(map)
        )
      );
    }
  };

  const createVisitRouting = (data: IVisitResultModel[], routingServer?: string, fitSelectedRoutes: boolean = true) => {
    if (mapState.map != undefined) {
      const map = mapState.map;
      if (mapState.visitRoutingControl != undefined) map.removeControl(mapState.visitRoutingControl);
      let items: IRoutingMachineLatLng[] = [];
      data.map((i, index) => {
        let icon = visitDefaultMarkerIcon;
        icon = customVisitIcon(index + 1, i.visitStatus);
        items.push({
          lat: i.locationLat,
          lng: i.locationLong,
          icon: icon,
          description: i.customerNumber,
          onClick: function () {
            dispatch(setVisitSelected(i));
          },
        });
      });
      dispatch(
        setVisitRoutingControl(
          createRoutineMachineLayer(
            items,
            routingServer,
            defaultMarkerIcon,
            defaultMarkerIcon,
            defaultMarkerIcon,
            fitSelectedRoutes,
            '#b711e0'
          ).addTo(map)
        )
      );
    }
  };

  const getMap = () => {
    return mapState.map;
  };

  return { createRouting, getMap, setStoreMarkers, createStoreRouting, createDriverRouting, createVisitRouting };
};
