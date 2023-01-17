import authenticationReducer from './reducers/authenticationReducer';
import layoutReducer from './reducers/layoutReducer';
import mapReducer from './reducers/mapReducer';
export const RootReducer = {
  layout: layoutReducer,
  authentication: authenticationReducer,
  map: mapReducer,
};

export default RootReducer;
