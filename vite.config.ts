import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const resolve = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': resolve('./src'),
      // shadcn generates `import { cn } from "cn"`; keep ui/ identical to upstream.
      cn: resolve('./src/lib/utils.ts'),
    },
  },
  plugins: [react(), tailwindcss()],
  build: { sourcemap: false, target: 'es2023' },
  server: { port: 5173 },
})
