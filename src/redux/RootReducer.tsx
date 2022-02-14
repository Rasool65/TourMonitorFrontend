import authenticationReducer from './reducers/authenticationReducer';
import layoutReducer from './reducers/layoutReducer';
import navbarReducer from './reducers/navbarReducer';
import mapReducer from './reducers/mapReducer';
export const RootReducer = {
  layout: layoutReducer,
  navbar: navbarReducer,
  authentication: authenticationReducer,
  map: mapReducer,
};

export default RootReducer;
