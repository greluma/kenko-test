import { useEffect, useRef } from 'react';
import {
  incrementNotificationsCont,
  addNotificacion,
  setArchivadas,
} from '../features/globalSlice';
import { useAppDispatch } from '../store/hooks';
import { io, type Socket } from 'socket.io-client';
import type { NotificationsInterface } from '../componentes/modal/body/ModalBody';
import sendNotificationToDesk from '../utils/sendNotificationToDesk';
// ...otros imports...

// ! pasar a variable de entorno
// const SOCKET_URL_LOCAL = 'http://192.168.1.132:3000';
const SOCKET_URL_PRODUCTION = 'https://kenko-back-test.onrender.com';

const useNotificaciones = () => {
  const dispatch = useAppDispatch();
  console.log(SOCKET_URL_PRODUCTION);

  useEffect(() => {
    fetch(`${SOCKET_URL_PRODUCTION}/archivadas`)
      .then((res) => res.json())
      .then((data) => dispatch(setArchivadas(data.archivadas)))
      .catch((err) => console.error('Error:', err));
  }, [dispatch]);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL_PRODUCTION, {
      transports: ['websocket'],
      secure: true,
    });
    socketRef.current.on('notificacion', (data: NotificationsInterface) => {
      sendNotificationToDesk(data);

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
