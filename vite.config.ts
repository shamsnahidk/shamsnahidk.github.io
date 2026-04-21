import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site at https://shamsnahidk.github.io/
// Repo name must be exactly "shamsnahidk.github.io".
export default defineConfig({
  plugins: [react()],
  base: '/',
})
