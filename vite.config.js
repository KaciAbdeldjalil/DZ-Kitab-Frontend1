import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    
    server: {
      host: true,
      port: 5173,
      allowedHosts: 'all'
    },
    
    preview: {
      host: true,
      port: 4173,
      allowedHosts: 'all'
    },

    build: {
      outDir: 'dist',
      rollupOptions: {
        input: './index.html'
      }
    }
  }
})
