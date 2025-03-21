/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],  // Keep this for your project
  },
  test: {
    globals: true,
    environment: 'jsdom',  // Required for testing React components
    setupFiles: './src/setupTests.ts',

  },
});
