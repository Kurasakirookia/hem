import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    // Vitest owns unit tests only. e2e/ uses Playwright's test API, which is a
    // different runner, so it must not be collected here.
    include: ['src/**/*.test.{ts,tsx}'],
  },
  server: {
    // Ports come from ecosystem.cjs; the fallbacks keep a bare `pnpm dev` working.
    port: Number(process.env.WEB_PORT ?? 5174),
    proxy: { '/api': `http://localhost:${process.env.API_PORT ?? 8001}` },
  },
})
