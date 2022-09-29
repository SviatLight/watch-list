import { configureStore } from '@reduxjs/toolkit';
import { moviesAPI } from './moviesAPI';
import movieSlice from './slices/movieSlice';

export const store = configureStore({
  reducer: {
    [moviesAPI.reducerPath]: moviesAPI.reducer,
    movieSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesAPI.middleware),
});
