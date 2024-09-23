import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { moviesReducer } from '../features/movies/moviesSlice';
import { userReducer } from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger])
});
