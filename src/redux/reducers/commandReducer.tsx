import { createSlice } from '@reduxjs/toolkit';
import { ICommandReducerState } from '../states/ICommandReducerState';

export const commandSlice = createSlice({
  name: 'commandelection',
  initialState: {
    refreshFavouriteDriversTrigger: new Date().toLocaleString(),
  } as ICommandReducerState,
  reducers: {
    refreshFavouriteDrivers: (state) => {
      state.refreshFavouriteDriversTrigger = new Date().toLocaleString();
    },
  },
});

export const { refreshFavouriteDrivers } = commandSlice.actions;

export default commandSlice.reducer;
