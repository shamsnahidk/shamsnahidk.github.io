import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site (e.g. shamsnahid.github.io) → base must be '/'.
// For a project site, change to '/<repo-name>/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
