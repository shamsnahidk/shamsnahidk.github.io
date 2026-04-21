import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site at https://shamsnahidk.github.io/
// Repo name must be exactly "shamsnahidk.github.io".
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('framer-motion')) return 'framer'
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) return 'react'
          if (id.includes('lucide-react')) return 'icons'
          if (id.includes('@fontsource')) return 'fonts'
          return 'vendor'
        },
      },
    },
  },
})
