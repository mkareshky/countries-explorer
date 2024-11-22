import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './countrySlice'; // Ensure this matches the `default` export in `countrySlice`

export const store = configureStore({
  reducer: {
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
