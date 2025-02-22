export function useCustomLogger(tag: string) {
	const isLoggingEnabled = process.env.LOGGING_ENABLED === 'true'

	const log = (level: 'debug' | 'info' | 'warn' | 'error', message: string) => {
		if (isLoggingEnabled) {
			console[level](`[${tag}] ${message}`)
		}
	}

	return {
		debug: (message: string) => log('debug', message),
		info: (message: string) => log('info', message),
		warn: (message: string) => log('warn', message),
		error: (message: string) => log('error', message),
	}
}
