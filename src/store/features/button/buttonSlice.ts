// src/store/features/button/buttonSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ButtonState {
  isActive: boolean;
  clickCount: number;
}

const initialState: ButtonState = {
  isActive: false,
  clickCount: 0,
};

export const buttonSlice = createSlice({
  name: 'button',
  initialState,
  reducers: {
    toggleActive: (state) => {
      state.isActive = !state.isActive;
    },
    incrementClickCount: (state) => {
      state.clickCount += 1;
    },
    resetClickCount: (state) => {
      state.clickCount = 0;
    },
  },
});

export const { toggleActive, incrementClickCount, resetClickCount } = buttonSlice.actions;

export default buttonSlice.reducer;