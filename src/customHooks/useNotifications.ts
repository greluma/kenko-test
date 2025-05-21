// hooks/useNotificaciones.ts
import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { NotificationsInterface } from '../componentes/ModalBody';
import { incrementNotificationsCont } from '../features/globalSlice';
import { useAppDispatch } from '../store/hooks';

// Define el tipo de los datos que emite el backend

interface ServerToClientEvents {
  notificacion: (data: NotificationsInterface) => void;
}

interface ClientToServerEvents {
  mensaje_desde_cliente: (data: string) => void;
}

const SOCKET_URL = 'http://localhost:3000';

const useNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState<
    NotificationsInterface[]
  >([]);
  const dispatch = useAppDispatch();

  // * Lógica para obtener archivadas
  const [archivadas, setArchivadas] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/archivadas')
      .then((res) => res.json())
      .then((data) => setArchivadas(data.archivadas))
      .catch((err) => console.error('Error:', err));
  }, []);

  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('notificacion', (data: NotificationsInterface) => {
      setNotificaciones((prev) => [data, ...prev]);
      dispatch(incrementNotificationsCont()); // Incrementa el contador
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const enviarMensaje = (mensaje: string) => {
    socketRef.current?.emit('mensaje_desde_cliente', mensaje);
  };

  return {
    notificaciones,
    enviarMensaje,
    archivadas,
  };
};

export default useNotificaciones;
