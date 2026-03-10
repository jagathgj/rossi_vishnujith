import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Set base to your repository name for GitHub Pages deployment
  // e.g. base: '/carbon-react-template-v11/'
  base: '/carbon-react-template-v11/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});