export function useCustomLogger(tag: string) {
	const isDev = process.env.NODE_ENV !== 'production'

	const log = (level: 'debug' | 'info' | 'warn' | 'error', message: unknown) => {
		if (isDev || level === 'error') {
			console[level](`[${tag}]: ${message}`)
		}
	}

	return {
		debug: (message: unknown) => log('debug', message),
		info: (message: unknown) => log('info', message),
		warn: (message: unknown) => log('warn', message),
		error: (message: unknown) => log('error', message),
	}
}
