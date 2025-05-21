import React, { useEffect, useState } from 'react';
import useNotificaciones from '../customHooks/useNotifications';

const Notificaciones: React.FC = () => {
  const { notificaciones, enviarMensaje } = useNotificaciones();

  // * Logica para obtener archivadas
  const [archivadas, setArchivadas] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/archivadas')
      .then((res) => res.json())
      .then((data) => setArchivadas(data.archivadas))
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <div>
      <h2>🔔 Notificaciones en tiempo real</h2>
      <button onClick={() => enviarMensaje('Hola backend desde React')}>
        Enviar mensaje de prueba
      </button>

      <ul>
        {notificaciones.map((n, index) => (
          <li key={index}>
            <strong>{n.titulo}</strong> - {n.mensaje} <br />
            <small>{new Date(n.timestamp).toLocaleTimeString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notificaciones;
