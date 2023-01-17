import { createSlice } from '@reduxjs/toolkit';
import { IMapReducerState } from '../states/IMapReducerState';

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    map: undefined,
  } as IMapReducerState,
  reducers: {
    setMap: (state, action) => {
      state.map = action.payload;
    },
    setSelectedTour: (state, action) => {
      state.selectedTour = action.payload;
    },
    setRoutingControl: (state, action) => {
      state.routingControl = action.payload;
    },
    setStoreMarkersLayer: (state, action) => {
      state.storeMarkersLayer = action.payload;
    },
    setStoreRoutingControl: (state, action) => {
      state.storeRoutingControl = action.payload;
    },
    setDriverRoutingControl: (state, action) => {
      state.driverRoutingControl = action.payload;
    },
    setVisitRoutingControl: (state, action) => {
      state.visitRoutingControl = action.payload;
    },
  },
});

export const {
  setMap,
  setSelectedTour,
  setRoutingControl,
  setStoreMarkersLayer,
  setStoreRoutingControl,
  setDriverRoutingControl,
  setVisitRoutingControl,
} = mapSlice.actions;

export default mapSlice.reducer;
