export default function sendNotificationToDesk(data: { mensaje: string }) {
  // Mostrar notificación de escritorio
  if (Notification.permission === 'granted') {
    new Notification('Notificación de Kenko Test', {
      body: data.mensaje, // Ajusta según la estructura de tu objeto data
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification('Nueva notificación', {
          body: data.mensaje,
        });
      }
    });
  }
}
