export default function dateFormat(timestamp: string) {
  const fecha = new Date(timestamp);
  const hora = fecha.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dia = fecha.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
  return `${hora} - ${dia}`;
}
