import { createSlice } from '@reduxjs/toolkit';
import { createRoutineMachineLayer } from '@src/components/map/RoutingMachine';
import { IMapReducerState } from '../states/IMapReducerState';
import * as L from 'leaflet';

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    map: undefined,
  } as IMapReducerState,
  reducers: {
    setMap: (state, action) => {
      state.map = action.payload;
    },
    setRoutingControl: (state, action) => {
      state.routingControl = action.payload;
    },
    // handleLogout: (state) => {},
  },
});

export const { setMap, setRoutingControl } = mapSlice.actions;

export default mapSlice.reducer;
