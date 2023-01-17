import { FunctionComponent, useEffect, useState } from 'react';
import { MapConsumer, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMap } from '@src/redux/reducers/mapReducer';
import mapConfig from '@src/configs/mapConfig';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IVehiclesResultModel } from '@src/models/output/vehicles/IVehiclesResultModel';
import { APIURL_GET_VEHICLES } from '@src/configs/apiConfig/apiUrls';
import MockData from './vehicles.json';
import { RootStateType } from '@src/redux/Store';

let mapRef: L.Map;
export const Map: FunctionComponent = (props: any) => {
  const dispatch = useDispatch();
  const httpRequest = useHttpRequest();
  const [vehicles, setVehicles] = useState<IVehiclesResultModel[]>();
  const [mockData] = useState<any>(MockData);
  const [map, setMap] = useState<any>();
  const location = useSelector((state: RootStateType) => state.map);
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

  useEffect(() => {
    if (map) map.flyTo([location.lat, location.long], mapConfig.defaultZoom);
  }, [location]);
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
          whenCreated={(map: any) => {
            setMap(map);
          }}
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
                    <>
                      <p>vin:{car.vin}</p>
                      <p>plate:{car.plate}</p>
                      <p>latitude:{car.geoCoordinate.latitude}</p>
                      <p>longitude:{car.geoCoordinate.longitude}</p>
                      <p>fuelLevel:{car.fuelLevel}</p>
                      <p>address:{car.address}</p>
                      <p>locationAlias:{car.locationAlias}</p>
                      <p>locationId:{car.locationId}</p>
                      <p>parkingId:{car.parkingId}</p>
                      <p>buildSeries:{car.buildSeries}</p>
                      <p>fuelType:{car.fuelType}</p>
                      <p>primaryColor:{car.primaryColor}</p>
                      <p>charging:{car.charging ? <img /> : <img />} </p>
                      <p>freeForRental:{car.freeForRental ? <img /> : <img />}</p>
                      <p>hardwareVersion:{car.hardwareVersion}</p>
                      <p>globalVersion:{car.globalVersion}</p>
                    </>
                  </Popup>
                </Marker>
              );
            })}
          {/* <MapConsumer>
            {(map: any) => {
              mapRef = map;
              dispatch(setMap(map));
              return null;
            }}
          </MapConsumer> */}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
