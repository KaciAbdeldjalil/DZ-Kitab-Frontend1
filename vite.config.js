import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  // Temporary: Allow Railway deployment
  const isRailway = process.env.RAILWAY_ENVIRONMENT
  
  if (command === 'build' && !isRailway && (!env.VITE_API_URL || env.VITE_API_URL.includes("localhost"))) {
    console.error("\n\n################################################################")
    console.error("BUILD FAILURE: VITE_API_URL is missing or set to localhost!")
    console.error("Found VITE_API_URL=" + env.VITE_API_URL)
    console.error("################################################################\n\n")
    process.exit(1)
  }

  return {
    plugins: [react()],
    // Local development - port 5173
    server: {
      host: true,
      port: 5173,
    },
    // Railway production - port 4173
    preview: {
      host: true,  // This is critical for Railway
      port: 4173,
      strictPort: true,  // Don't change port
    },
    // Important for SPA routing
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: './index.html'
      }
    }
  }
})