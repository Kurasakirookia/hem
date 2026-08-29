import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    // Ports come from ecosystem.cjs; the fallbacks keep a bare `pnpm dev` working.
    port: Number(process.env.WEB_PORT ?? 5174),
    proxy: { '/api': `http://localhost:${process.env.API_PORT ?? 8001}` },
  },
})
