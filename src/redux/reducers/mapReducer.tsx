import { createSlice } from '@reduxjs/toolkit';
import { IMapReducerState } from '../states/IMapReducerState';

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    map: undefined,
  } as IMapReducerState,
  reducers: {
    setMap: (state, action) => {
      debugger;
      state.map = action.payload;
    },
  },
});

export const { setMap } = mapSlice.actions;

export default mapSlice.reducer;
