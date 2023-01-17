import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './RootReducer';

export const Store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootStateType = ReturnType<typeof Store.getState>;

export default Store;
