export default function awakeServer() {
  const SOCKET_URL_PRODUCTION = 'https://kenko-back-test.onrender.com';
  fetch(`${SOCKET_URL_PRODUCTION}/archivadas`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert(`El servidor está activo.`);
    })
    .catch((err) => {
      console.error('Error:', err);
      alert(`Problemas con el servidor.`);
    });
}
