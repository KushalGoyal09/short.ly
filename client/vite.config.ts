import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const _plugins = [react()];
export default defineConfig({
  plugins: _plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': "https://backend-shorty.kushalgoyal.tech"
    }
  }
});