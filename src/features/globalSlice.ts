import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

interface GlobalState {
  value: number;
}

const initialState: GlobalState = {
  value: 10,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = globalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGlobal = (state: RootState) => state.global.value;

export default globalSlice.reducer;
