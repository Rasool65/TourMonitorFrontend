import authenticationReducer from './reducers/authenticationReducer';
import layoutReducer from './reducers/layoutReducer';
export const RootReducer = {
  layout: layoutReducer,
  authentication: authenticationReducer,
};

export default RootReducer;
