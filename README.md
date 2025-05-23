# Kenko Test FrontEnd

## Introducción

Kenko Test FrontEnd es una aplicación web desarrollada por [Manuel Rodriguez Prieto](https://github.com/greluma) como prueba técnica para Kenko Imalytics. Permite la gestión y visualización de notificaciones en tiempo real, con soporte para múltiples idiomas y una interfaz moderna, responsiva y accesible. El objetivo es demostrar buenas prácticas de desarrollo frontend, integración con APIs en tiempo real y una experiencia de usuario fluida.

---

## Tecnologías utilizadas

- **React 19**: Biblioteca principal para la construcción de interfaces de usuario.
- **TypeScript**: Tipado estático para mayor robustez y mantenibilidad del código.
- **Redux Toolkit**: Manejo del estado global de la aplicación de forma eficiente y escalable.
- **Vite**: Herramienta de desarrollo y bundler ultrarrápido.
- **TailwindCSS**: Framework de utilidades CSS para estilos rápidos y consistentes.
- **Framer Motion**: Animaciones fluidas y declarativas en React.
- **Socket.io-client**: Comunicación en tiempo real con el backend para recibir notificaciones instantáneas.
- **i18next + react-i18next**: Internacionalización y soporte multilenguaje (español, inglés, francés).
- **React Icons**: Iconografía moderna y personalizable.

---

## Bondades de la aplicación

- **Notificaciones en tiempo real**: Recibe y gestiona notificaciones instantáneamente gracias a Socket.io.
- **Internacionalización**: Cambia el idioma de la interfaz entre español, inglés y francés de forma dinámica.
- **UI moderna y responsiva**: Interfaz adaptada a dispositivos móviles y escritorio, con animaciones atractivas.
- **Gestión avanzada de notificaciones**: Marca como leído/no leído, archiva, desarchiva y elimina notificaciones.
- **Accesibilidad**: Navegación por teclado, roles ARIA y enfoque en la usabilidad.
- **Widget flotante**: Acceso rápido al panel de notificaciones desde cualquier parte de la app.
- **Integración con backend**: Comunicación con API REST y WebSocket para mantener los datos sincronizados.

---

## Enlaces

### Repositorios

- [FrontEnd](https://github.com/greluma/kenko-test)
- [Backend](https://github.com/greluma/kenko-back)

### Live in Production

- [Demo en Netlify](https://kenko-test-front.netlify.app/)

> **Nota:** Al abrir la demo, pulsa el botón **Awake Server** para activar el backend (puede estar en reposo la primera vez y tardar unos segundos en responder).

### Video explicativo en Youtube

- [Acceder al video](https://kenko-test-front.netlify.app/)

---

## ¿Cómo arrancar el proyecto?

### Requisitos previos

- Node.js >= 18.x
- npm >= 9.x

### Pasos

1. **Clona el repositorio**

2. **Instala las dependencias: npm install**

3. **Arranca el servidor de desarrollo: npm run dev**

¡Listo! Ahora puedes explorar todas las funcionalidades de la aplicación Kenko Test FrontEnd.
