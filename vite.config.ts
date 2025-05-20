import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Escucha en 0.0.0.0 (todas las interfaces)
    port: 5173, // Puedes cambiarlo si quieres otro puerto
  },
});
