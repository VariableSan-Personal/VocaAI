import { useRuntimeConfig } from '#imports'
import * as Sentry from '@sentry/nuxt'

const config = useRuntimeConfig()
Sentry.init({
	// If set up, you can use your runtime config here
	dsn: config.public?.sentry?.dsn,
})
