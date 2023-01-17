import { createSlice } from '@reduxjs/toolkit';
import { IMapReducerState } from '../states/IMapReducerState';
import mapConfig from './../../configs/mapConfig/index';

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    lat: mapConfig.defaultPosition[0], //53
    long: mapConfig.defaultPosition[1], //10
  } as IMapReducerState,
  reducers: {
    setMap: (state, action) => {
      state.lat = action.payload[0];
      state.long = action.payload[1];
    },
  },
});

export const { setMap } = mapSlice.actions;

export default mapSlice.reducer;
