import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.NODE_ENV !== "production" ?  "http://localhost:5000" : "https://e-commerce-first-api-qeof.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
