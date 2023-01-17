import authenticationReducer from './reducers/authenticationReducer';
import layoutReducer from './reducers/layoutReducer';
import cacheDataReducer from './reducers/cacheDataReducer';
import mapReducer from './reducers/mapReducer';
import commandReducer from './reducers/commandReducer';
export const RootReducer = {
  layout: layoutReducer,
  authentication: authenticationReducer,
  map: mapReducer,
  cacheData: cacheDataReducer,
  command: commandReducer,
};

export default RootReducer;
