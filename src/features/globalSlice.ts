import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

interface GlobalState {
  contadorNotificaciones: number;
}

const initialState: GlobalState = {
  contadorNotificaciones: 0,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    incrementNotificationsCont: (state) => {
      state.contadorNotificaciones += 1;
    },
    resetNotificationsCont: (state) => {
      state.contadorNotificaciones = 0;
    },
  },
});

export const { incrementNotificationsCont, resetNotificationsCont } =
  globalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const contadorNotificacionesGlobal = (state: RootState) =>
  state.global.contadorNotificaciones;

export default globalSlice.reducer;
