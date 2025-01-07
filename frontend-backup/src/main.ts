import customAliases from '@/app/icons.config'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import 'vuetify/styles'
import colors from 'vuetify/util/colors'
import App from './App.vue'
import './assets/main.css'
import { router } from './router'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
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
      ...customAliases,
    },
    sets: {
      mdi,
    },
  },
})

app.use(createPinia()).use(router).use(vuetify)

app.mount('#app')
