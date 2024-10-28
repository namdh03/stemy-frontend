import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ react({
    // Disable TypeScript type-checking
    include: '**/*.tsx',
    typescript: {
      ignoreDiagnostics: true, // Ignores all TypeScript errors
    },
  }),],
  server: {
    port: 3000,
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~apis': path.resolve(__dirname, './src/apis'),
      '~assets': path.resolve(__dirname, './src/assets'),
      '~components': path.resolve(__dirname, './src/components'),
      '~constants': path.resolve(__dirname, './src/constants'),
      '~configs': path.resolve(__dirname, './src/configs'),
      '~contexts': path.resolve(__dirname, './src/contexts'),
      '~graphql': path.resolve(__dirname, './src/graphql'),
      '~guards': path.resolve(__dirname, './src/guards'),
      '~hooks': path.resolve(__dirname, './src/hooks'),
      '~layouts': path.resolve(__dirname, './src/layouts'),
      '~lib': path.resolve(__dirname, './src/lib'),
      '~pages': path.resolve(__dirname, './src/pages'),
      '~routes': path.resolve(__dirname, './src/routes'),
      '~types': path.resolve(__dirname, './src/types'),
      '~services': path.resolve(__dirname, './src/services'),
      '~store': path.resolve(__dirname, './src/store'),
      '~utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
