import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  // TEMPORARY: Allow Railway deployment without VITE_API_URL
  // Remove this after you fix the build
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
    preview: {
      host: '0.0.0.0',
      port: 4173,
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
    }
  }
})