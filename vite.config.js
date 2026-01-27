import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  // Allow Railway deployment without VITE_API_URL during transition
  // Remove this block after you add your actual API URL
  const isRailway = process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_NAME
  
  if (command === 'build' && !isRailway && (!env.VITE_API_URL || env.VITE_API_URL.includes("localhost"))) {
    console.error("\n\n################################################################")
    console.error("BUILD FAILURE: VITE_API_URL is missing or set to localhost!")
    console.error("Production builds must have a valid external API URL.")
    console.error("Found VITE_API_URL=" + env.VITE_API_URL)
    console.error("################################################################\n\n")
    process.exit(1)
  }

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',  // Explicitly bind to all interfaces
      port: 5173,
      strictPort: false, // Allow port fallback
    },
    preview: {
      host: '0.0.0.0',  // Critical for Railway
      port: 4173,
      strictPort: true,  // Don't allow port fallback in production
    },
    base: '/',
    build: {
      outDir: 'dist',
      target: 'es2020',
      minify: 'terser',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@mui/material', '@emotion/react', '@emotion/styled'],
          }
        }
      }
    }
  }
})