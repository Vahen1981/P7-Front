import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',  // Permite que escuche en todas las interfaces de red
    port: 5173,       // Puerto en el que corre el servidor (por defecto es 5173)
  },
  preview: {
    allowedHosts: ['p7-front-production.up.railway.app']
  }
})
