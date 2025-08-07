import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    modulePreload: { polyfill: false },
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'vendor-router'
            if (id.includes('react-dom') || id.includes('/react/')) return 'vendor-react'
            if (id.includes('@radix-ui')) return 'vendor-radix'
            if (id.includes('lucide-react')) return 'vendor-icons'
            if (id.includes('recharts')) return 'vendor-charts'
            if (id.includes('embla-carousel')) return 'vendor-carousel'
            if (id.includes('cmdk')) return 'vendor-cmdk'
            if (id.includes('date-fns')) return 'vendor-date-fns'
            if (id.includes('@base44/sdk')) return 'vendor-base44'
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
}) 