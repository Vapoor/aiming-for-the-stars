import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
/// <reference types="vitest/config" />

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
  server: {
    port: 5175,
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
})
