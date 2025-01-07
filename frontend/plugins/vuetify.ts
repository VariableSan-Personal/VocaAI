import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi.mjs'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import colors from 'vuetify/util/colors'

export default defineNuxtPlugin((app) => {
	const vuetify = createVuetify({
		theme: {
			defaultTheme: 'dark',
			themes: {
				dark: {
					dark: true,
					colors: {
						secondary: colors.grey.base,
					},
				},
			},
		},
		icons: {
			defaultSet: 'mdi',
			aliases: {
				...aliases,
			},
			sets: {
				mdi,
			},
		},
	})
	app.vueApp.use(vuetify)
})
