import { createSlice } from '@reduxjs/toolkit';
import { ITourVisitSelectionReducerState } from '../states/ITourVisitSelectionReducerState';

export const tourVisitSelectionSlice = createSlice({
  name: 'tourVisitSelection',
  initialState: {
    visitSelection: undefined,
    showVisitPanel: false,
  } as ITourVisitSelectionReducerState,
  reducers: {
    setVisitSelected: (state, action) => {
      var result = action.payload;
      if (result == undefined) state.visitSelection = undefined;
      else {
        state.visitSelection = result;
        state.showVisitPanel = true;
      }
    },
    setShowVisitPanel: (state, action) => {
      var result = action.payload;
      state.showVisitPanel = result;
    },
  },
});

export const { setVisitSelected, setShowVisitPanel } = tourVisitSelectionSlice.actions;

export default tourVisitSelectionSlice.reducer;
