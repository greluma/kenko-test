import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import type { NotificationsInterface } from '../componentes/modal/body/ModalBody';

interface GlobalState {
  contadorNotificaciones: number;
  notificaciones: NotificationsInterface[];
  archivadas: NotificationsInterface[];
}

const initialState: GlobalState = {
  contadorNotificaciones: 0,
  notificaciones: [],
  archivadas: [],
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
    setNotificaciones: (
      state,
      action: PayloadAction<NotificationsInterface[]>
    ) => {
      state.notificaciones = action.payload;
    },
    addNotificacion: (state, action: PayloadAction<NotificationsInterface>) => {
      state.notificaciones.unshift(action.payload);
    },
    setArchivadas: (state, action: PayloadAction<NotificationsInterface[]>) => {
      state.archivadas = action.payload;
    },
    cambiarEstadoLeido: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const notif = state.notificaciones.find((n) => n.id === +id);
      if (notif) {
        notif.leido = !notif.leido;
        return;
      }
      const arch = state.archivadas.find((n) => n.id === +id);
      if (arch) {
        arch.leido = !arch.leido;
      }
    },
    eliminarNotificacion: (state, action: PayloadAction<string>) => {
      const id = Number(action.payload);
      state.notificaciones = state.notificaciones.filter((n) => n.id !== id);
      state.archivadas = state.archivadas.filter((n) => n.id !== id);
    },
    moverNotificacion: (
      state,
      action: PayloadAction<{ id: string; lista: number }>
    ) => {
      const id = Number(action.payload.id);
      if (action.payload.lista === 0) {
        // Mover de inbox a archivadas
        const idx = state.notificaciones.findIndex((n) => n.id === id);
        if (idx !== -1) {
          const [item] = state.notificaciones.splice(idx, 1);
          state.archivadas.unshift(item);
        }
      } else if (action.payload.lista === 1) {
        // Mover de archivadas a inbox
        const idx = state.archivadas.findIndex((n) => n.id === id);
        if (idx !== -1) {
          const [item] = state.archivadas.splice(idx, 1);
          state.notificaciones.unshift(item);
        }
      }
    },
  },
});

export const {
  incrementNotificationsCont,
  resetNotificationsCont,
  setNotificaciones,
  addNotificacion,
  setArchivadas,
  cambiarEstadoLeido,
  eliminarNotificacion,
  moverNotificacion,
} = globalSlice.actions;

export const contadorNotificacionesGlobal = (state: RootState) =>
  state.global.contadorNotificaciones;
export const notificacionesGlobal = (state: RootState) =>
  state.global.notificaciones;
export const archivadasGlobal = (state: RootState) => state.global.archivadas;

export default globalSlice.reducer;
