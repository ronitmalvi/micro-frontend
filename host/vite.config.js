import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        chatApp: {
          external: 'http://localhost:5001/assets/remoteEntry.js',
          from: 'vite',
          format: 'esm'
        },
        emailApp: {
          external: 'http://localhost:5002/assets/remoteEntry.js',
          from: 'vite',
          format: 'esm'
        }
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
  }
});