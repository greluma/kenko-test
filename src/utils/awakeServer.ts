export default function awakeServer() {
  const SOCKET_URL_PRODUCTION = 'https://kenko-back-test.onrender.com';
  fetch(`${SOCKET_URL_PRODUCTION}/archivadas`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error('Error:', err));
}
