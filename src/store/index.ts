// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import buttonReducer from './features/button/buttonSlice';
import bodybuilderReducer from './features/bodybuilders/bodybuilderSlice';

export const store = configureStore({
  reducer: {
    button: buttonReducer,
    bodybuilders: bodybuilderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;