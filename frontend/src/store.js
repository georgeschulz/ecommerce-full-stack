import { configureStore } from '@reduxjs/toolkit';
import wizardSlice from './features/wizardSlice';
import authSlice from './features/auth';

export const store = configureStore({
    reducer: {
        wizard: wizardSlice,
        auth: authSlice
    }
});