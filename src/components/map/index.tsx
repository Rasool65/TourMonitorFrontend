import { FunctionComponent } from 'react';
import { MapConsumer, MapContainer, TileLayer } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch } from 'react-redux';
import { setMap } from '@src/redux/reducers/mapReducer';
import mapConfig from '@src/configs/mapConfig';

let mapRef: L.Map;
export const Map: FunctionComponent = (props: any) => {
  const dispatch = useDispatch();
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
            attribution='&copy; <a href="#">Solico Group</a> software'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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
