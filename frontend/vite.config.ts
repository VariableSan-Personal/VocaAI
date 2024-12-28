import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: ['src/views'],
    }),
    Layouts({
      defaultLayout: 'base',
      layoutsDirs: 'src/layouts',
      pagesDirs: ['src/views'],
    }),
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'logo.svg'],

      manifest: {
        theme_color: '#8936FF',
        background_color: '#2EC6FE',
        icons: [
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: 'maskable-icon-512x512.png',
            type: 'image/png',
          },
          {
            purpose: 'any',
            sizes: '512x512',
            src: 'pwa-512x512.png',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/screenshots/desktop.png',
            type: 'image/png',
            sizes: '2532x1037',
            form_factor: 'wide',
          },
          {
            src: '/screenshots/mobile.png',
            type: 'image/png',
            sizes: '512x1083',
            form_factor: 'narrow',
          },
        ],
        orientation: 'any',
        display: 'standalone',
        lang: 'en-US',
        name: 'AI Vocabulary Builder',
        short_name: 'AI Voc',
        description: 'An application to help users build and enhance their vocabulary using AI',
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,svg,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === 'style' ||
              request.destination === 'script' ||
              request.destination === 'worker',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.includes('/api'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'api-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
              },
            },
          },
        ],
      },

      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,svg,ico}'],
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    // todo: change to goservice
    VITE_DOTNET_SERVICE_URL: JSON.stringify(process.env.VITE_DOTNET_SERVICE_URL),
  },
})
