import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const _plugins = [react()];
export default defineConfig({
  plugins: _plugins,
  server: {
    proxy: {
      '/api': "http://localhost:3000"
    }
  }
});