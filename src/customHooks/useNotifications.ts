import { useEffect, useRef } from 'react';
import {
  incrementNotificationsCont,
  addNotificacion,
  setArchivadas,
} from '../features/globalSlice';
import { useAppDispatch } from '../store/hooks';
import { io, type Socket } from 'socket.io-client';
import type { NotificationsInterface } from '../componentes/ModalBody';
// ...otros imports...

const useNotificaciones = () => {
  const dispatch = useAppDispatch();
  const SOCKET_URL = 'http://localhost:3000';

  useEffect(() => {
    fetch('http://localhost:3000/archivadas')
      .then((res) => res.json())
      .then((data) => dispatch(setArchivadas(data.archivadas)))
      .catch((err) => console.error('Error:', err));
  }, [dispatch]);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('notificacion', (data: NotificationsInterface) => {
      dispatch(addNotificacion(data));
      dispatch(incrementNotificationsCont());
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [dispatch]);

  const enviarMensaje = (mensaje: string) => {
    socketRef.current?.emit('mensaje_desde_cliente', mensaje);
  };

  return {
    enviarMensaje,
  };
};

export default useNotificaciones;
