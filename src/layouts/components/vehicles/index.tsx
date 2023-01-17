import { FunctionComponent, useState, useEffect } from 'react';
import MockData from '@src/components/map/vehicles.json';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { useDispatch } from 'react-redux';
import { IVehiclesResultModel } from '@src/models/output/vehicles/IVehiclesResultModel';
import { setMap } from '@src/redux/reducers/mapReducer';

interface vehicleListProps {}

const VehicleList: FunctionComponent<vehicleListProps> = () => {
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
      {vehicles &&
        vehicles.length > 0 &&
        vehicles.map((car: IVehiclesResultModel, index: number) => {
          return (
            <>
              <h5
                onClick={() => {
                  dispatch(setMap([car.geoCoordinate.latitude, car.geoCoordinate.longitude]));
                }}
              >
                {index}-{car.plate}
              </h5>
            </>
          );
        })}
    </>
  );
};

export default VehicleList;
