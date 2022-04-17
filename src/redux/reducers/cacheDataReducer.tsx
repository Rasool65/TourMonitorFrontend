import { createSlice } from '@reduxjs/toolkit';
import { ICacheDataReducerState } from '../states/ICacheDataReducerState';

export const cacheDataSlice = createSlice({
  name: 'cacheData',
  initialState: {
    visitData: undefined,
  } as ICacheDataReducerState,
  reducers: {
    setVisitData: (state, action) => {
      var result = action.payload;
      if (result == undefined) state.visitData = undefined;
      else state.visitData = result.data.data;
    },
  },
});

export const { setVisitData } = cacheDataSlice.actions;

export default cacheDataSlice.reducer;
