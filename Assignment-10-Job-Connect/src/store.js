import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './features/jobSlice';

export const store = configureStore({
    reducer: {
        job: jobReducer,
    },
});
