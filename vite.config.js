import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    // OPTIMIZATION: Split large vendor libraries into separate chunks.
    // The browser can cache them independently — GSAP changes rarely,
    // so returning visitors don't re-download it when app code changes.
    // This also reduces the main-thread blocking time (TBT) by letting
    // the browser parse chunks in parallel.
    rollupOptions: {
      output: {
        manualChunks: {
          // React runtime — very rarely changes
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // GSAP — large animation library, changes infrequently
          'vendor-gsap': ['gsap'],
          // Supabase client — sizeable, changes on SDK updates only
          'vendor-supabase': ['@supabase/supabase-js'],
        },
      },
    },
    // OPTIMIZATION: Raise the chunk warning threshold slightly —
    // our manual split means individual chunks are intentionally larger
    chunkSizeWarningLimit: 600,
  },
})