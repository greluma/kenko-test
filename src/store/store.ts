import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '../features/globalSlice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

// Tipos para usar con useSelector y useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
