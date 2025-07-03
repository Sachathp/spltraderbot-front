import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // utile surtout sur certains OS (comme WSL ou Docker)
    },
    strictPort: true,
  },
  base: '/spltraderbot-front/', // Correction : correspond au nom de votre repository
  build: {
    outDir: 'dist'
  }
})
