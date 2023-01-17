import { FunctionComponent, useEffect, useState } from 'react';
import { MapConsumer, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch } from 'react-redux';
import { setMap } from '@src/redux/reducers/mapReducer';
import mapConfig from '@src/configs/mapConfig';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IVehiclesResultModel } from '@src/models/output/vehicles/IVehiclesResultModel';
import { APIURL_GET_VEHICLES } from '@src/configs/apiConfig/apiUrls';
import MockData from './vehicles.json';

let mapRef: L.Map;
export const Map: FunctionComponent = (props: any) => {
  const dispatch = useDispatch();
  const httpRequest = useHttpRequest();
  const [vehicles, setVehicles] = useState<IVehiclesResultModel[]>();
  const [mockData] = useState<any>(MockData);

  const GetVehiclesList = () => {
    //! نمونه کد
    //! API خواندن دیتا از طریق ای پی آی بصورت مدل سازی شده خواهد بود
    // httpRequest.getRequest<IOutputResult<IVehiclesResultModel>>(APIURL_GET_VEHICLES).then((result) => {
    //   setVehicles(result.data.data);
    // });
    // .finally(() => setIsLoading(false));

    //! Internal Data
    setVehicles(mockData);
  };

  useEffect(() => {
    GetVehiclesList();
  }, []);
  return (
    <>
      <div>
        <MapContainer
          center={mapConfig.defaultPosition}
          zoom={mapConfig.defaultZoom}
          zoomControl={false}
          scrollWheelZoom={true}
          attributionControl={false}
          className="map-container"
          style={{ height: '100vh', position: 'fixed', right: 0, top: 0 }}
        >
          <TileLayer
            key={'base'}
            attribution='&copy; <a href="#">Bahman Group</a> software'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {vehicles &&
            vehicles.length > 0 &&
            vehicles.map((car: IVehiclesResultModel, index: number) => {
              return (
                <Marker position={[car.geoCoordinate.latitude, car.geoCoordinate.longitude]}>
                  <Popup>
                    <>{car.plate}</>
                  </Popup>
                </Marker>
              );
            })}
          <MapConsumer>
            {(map) => {
              mapRef = map;
              dispatch(setMap(map));
              return null;
            }}
          </MapConsumer>
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
