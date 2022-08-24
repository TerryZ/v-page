import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
// import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
// export default defineConfig({
//   build: {},
//   test: {
//     coverage: {
//       reporter: ['text', 'json', 'html']
//     }
//   },
//   plugins: [vue()]
// })
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
