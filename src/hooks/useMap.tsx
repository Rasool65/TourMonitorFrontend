import { createRoutineMachineLayer } from '@src/components/map/RoutingMachine';
import { setRoutingControl } from '@src/redux/reducers/mapReducer';
import { RootStateType } from '@src/redux/Store';
import { useDispatch, useSelector } from 'react-redux';

export const useMap = () => {
  const mapState = useSelector((state: RootStateType) => state.map);
  const dispatch = useDispatch();
  const createRouting = (plan: L.LatLng[]) => {
    if (mapState.map != undefined) {
      const map = mapState.map;
      if (mapState.routingControl != undefined) map.removeControl(mapState.routingControl);
      dispatch(setRoutingControl(createRoutineMachineLayer(plan).addTo(map)));
    }
  };

  const getMap = () => {
    return mapState.map;
  };

  return { createRouting, getMap };
};
