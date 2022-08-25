import { fileURLToPath, URL } from 'node:url'
// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {},
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
})
