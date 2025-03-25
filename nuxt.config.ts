import { fileURLToPath, URL } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: false },
	experimental: {
		appManifest: false,
	},
	modules: [
		'@nuxt/eslint',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@vite-pwa/nuxt',
		'@nuxt/icon',
		'@vueuse/nuxt',
	],
	build: {
		transpile: [],
	},
	typescript: {
		typeCheck: true,
	},
	css: ['~/assets/css/main.css'],
	vite: {
		vue: {
			template: {},
		},
	},
	runtimeConfig: {
		public: {
			baseUrl: 'http://localhost:4000/api/v1',
			geminiUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
		},
	},
	alias: {
		'@': fileURLToPath(new URL('./', import.meta.url)),
	},

	nitro: {
		esbuild: {
			options: {
				target: 'esnext',
			},
		},
		prerender: {
			routes: ['/', '/learn', '/vocabulary', '/menu'],
		},
	},

	pwa: {
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
      // TODO: Update screenshots of application
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

		client: {
			installPrompt: true,
			// you don't need to include this: only for testing purposes
			// if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
			// periodicSyncForUpdates: 20,
		},

		devOptions: {
			enabled: false,
			suppressWarnings: true,
			navigateFallback: '/',
			navigateFallbackAllowlist: [/^\/$/],
			type: 'module',
		},
	},
})
