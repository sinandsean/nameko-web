import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/nameko-web/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and React DOM
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Motion library separate chunk
          'vendor-motion': ['motion'],
          // Icons separate chunk
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 600,
    // Enable minification
    minify: 'esbuild', // Use esbuild for faster builds
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'motion', 'lucide-react'],
    exclude: [], // Explicitly exclude unused heavy deps
  },
})
