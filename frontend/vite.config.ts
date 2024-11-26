import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    VITE_DOTNET_SERVICE_URL: JSON.stringify(process.env.VITE_DOTNET_SERVICE_URL),
    VITE_JAVA_SERVICE_URL: JSON.stringify(process.env.VITE_JAVA_SERVICE_URL),
  },
})
