import authenticationReducer from './reducers/authenticationReducer';
import layoutReducer from './reducers/layoutReducer';
import cacheDataReducer from './reducers/cacheDataReducer';
import tourVisitSelectionReducer from './reducers/tourVisitSelectionReducer';
import navbarReducer from './reducers/navbarReducer';
import mapReducer from './reducers/mapReducer';
import routeReducer from './reducers/routeReducer';
import commandReducer from './reducers/commandReducer';
export const RootReducer = {
  layout: layoutReducer,
  navbar: navbarReducer,
  authentication: authenticationReducer,
  map: mapReducer,
  route: routeReducer,
  cacheData: cacheDataReducer,
  tourVisitSelection: tourVisitSelectionReducer,
  command: commandReducer,
};

export default RootReducer;
