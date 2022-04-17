import {
  APIURL_GET_DRIVER_LOCATION_DATA,
  APIURL_GET_LOCATION_SETTING,
  APIURL_GET_VISIT_DATA,
} from '@src/configs/apiConfig/apiUrls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { useMap } from '@src/hooks/useMap';
import { useToast } from '@src/hooks/useToast';
import IDriverResultModel from '@src/models/output/driver/IDriverResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import ILocationSetting from '@src/models/output/setting/ILocationSetting';
import { IVisitResultModel } from '@src/models/output/visit/IVisitResultModel';
import { RootStateType } from '@src/redux/Store';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TourUpdateLocation: FunctionComponent = () => {
  const httpRequest = useHttpRequest();
  const toast = useToast();

  const mapState = useSelector((state: RootStateType) => state.map);
  const routeState = useSelector((state: RootStateType) => state.route);
  const map = useMap();
  const [timerCount, setTimerCount] = useState<number>(0);
  const [timerTime, setTimerTime] = useState<number>();
  const localStorage = useLocalStorage();

  useEffect(() => {
    if (timerTime == undefined) {
      httpRequest.getRequest<IOutputResult<ILocationSetting>>(APIURL_GET_LOCATION_SETTING).then((result) => {
        setTimerTime(result.data.data.driverLocationUpdateSecond);
        setInterval(() => {
          setTimerCount((t) => t + 1);
        }, 1000 * result.data.data.driverLocationUpdateSecond);
      });
    }
  }, []);

  useEffect(() => {
    if (timerTime != undefined && timerCount > 0) {
      const mapSection = mapState.map;
      if (mapSection != undefined && mapState.selectedTour != undefined) {
        let driverRouteUrl = localStorage.get('DriverRouteUrl');
        if (driverRouteUrl != '') {
          if (routeState.driver) {
            httpRequest
              .getRequest<IOutputResult<IDriverResultModel[]>>(APIURL_GET_DRIVER_LOCATION_DATA, () => {}, {
                params: { tourId: mapState.selectedTour?.tourId },
              })
              .then((result) => {
                map.createDriverRouting(result.data.data, driverRouteUrl ?? undefined, false);
              });
          } else {
            if (mapState.driverRoutingControl != undefined) mapSection?.removeControl(mapState.driverRoutingControl);
          }
        }
        let actualRouteUrl = localStorage.get('ActualRouteUrl');
        if (driverRouteUrl != '') {
          if (routeState.actual) {
            httpRequest
              .getRequest<IOutputResult<IVisitResultModel[]>>(APIURL_GET_VISIT_DATA, () => {}, {
                params: { tourId: mapState.selectedTour?.tourId },
              })
              .then((result) => {
                map.createVisitRouting(result.data.data, actualRouteUrl ?? undefined, false);
              });
          } else {
            if (mapState.visitRoutingControl != undefined) mapSection?.removeControl(mapState.visitRoutingControl);
          }
        }
      }
    }
  }, [timerCount]);

  return <></>;
};

export default TourUpdateLocation;
