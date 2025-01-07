import { fileURLToPath, URL } from 'node:url'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	modules: [
		'@nuxt/eslint',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',

		(_options, nuxt) => {
			nuxt.hooks.hook('vite:extendConfig', (config) => {
				// @ts-expect-error
				config.plugins.push(vuetify({ autoImport: true }))
			})
		},
		//...
	],
	build: {
		transpile: ['vuetify'],
	},
	typescript: {
		typeCheck: true,
	},
	vite: {
		vue: {
			template: {
				transformAssetUrls,
			},
		},
	},
	runtimeConfig: {
		public: {
			baseURL: 'http://localhost:4000/api/v1',
		},
	},
	alias: {
		'@': fileURLToPath(new URL('./', import.meta.url)),
	},
})
