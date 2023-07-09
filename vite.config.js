import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { apiUrl } from "./src/utils/baseUrls";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: apiUrl,
        changeOrigin: true,
        secure: false,
        https: true,
      },
    },
  },
});
