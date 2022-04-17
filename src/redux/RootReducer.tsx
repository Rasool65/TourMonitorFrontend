import authenticationReducer from './reducers/authenticationReducer';
import layoutReducer from './reducers/layoutReducer';
import cacheDataReducer from './reducers/cacheDataReducer';
import tourVisitSelectionReducer from './reducers/tourVisitSelectionReducer';
import navbarReducer from './reducers/navbarReducer';
import mapReducer from './reducers/mapReducer';
import routeSlice from './reducers/routeReducer';
export const RootReducer = {
  layout: layoutReducer,
  navbar: navbarReducer,
  authentication: authenticationReducer,
  map: mapReducer,
  route: routeSlice,
  cacheData: cacheDataReducer,
  tourVisitSelection: tourVisitSelectionReducer,
};

export default RootReducer;
